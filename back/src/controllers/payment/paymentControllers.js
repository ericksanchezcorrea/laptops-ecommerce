import mercadopago from 'mercadopago'
// import { User } from '../../models/User';
import { User } from '../../models/User.js';
import { ShoppingCart } from '../../models/ShoppingCart.js';
import { Address } from '../../models/Address.js';
import { Laptop } from '../../models/Laptop.js'
import { BASE_URL_BACK, BASE_URL_FRONT, MERCADO_PAGO_ACCESS_TOKEN } from '../../config.js';
 


export const createOrder = async (req, res)=>{
    try{
        // antes de asegurar la compra. reviso que el usuario tenga DNI, email.confirmado, phone, dirección
        // return. falta confirmar unos campos.
        const {items} = req.body

        const newItems = await Promise.all(items.map(async(item) =>{
          let laptop = await Laptop.findByPk(item.id);
          return{
            description: item.description,
            quantity: item.quantity,
            id: item.id,
            category_id: item.category_id,
            unit_price: laptop.offert ? laptop.offert : laptop.price,
            title: laptop.model
          }
        }))
        
        mercadopago.configure({
            access_token: MERCADO_PAGO_ACCESS_TOKEN
        });


        const preference = {
            items: newItems,
            back_urls: {
                "success": `${BASE_URL_FRONT}`,
                "failure": `${BASE_URL_FRONT}`,
                "pending": `${BASE_URL_FRONT}`,
            },
            notification_url: `${BASE_URL_BACK}/api/webhook`,
            auto_return: "approved",
        }

        const result = await mercadopago.preferences.create(preference)

        return res.status(200).json(result.body)
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
}


export const receiveWebhook = async (req, res) => {
    try {
      const payment = req.query;
      let email, items, total, address
      
      if (payment.type === "payment") {
        const data = await mercadopago.payment.findById(payment["data.id"]);

        items = data.body.additional_info.items
        email = data.body.additional_info.items[0].description  // email del usuario
        address = data.body.additional_info.items[0].category_id  // dirección del usuario 
        total = data.body.transaction_amount  
        
        // almacenar shoppingCart en la db

        async function createShoppingCart(userEmail, items, total) {
          try {
            const userFound = await User.findOne({ where: { email: userEmail } });
            if (!userFound) {
              throw new Error('User not found');
            }
        
            const shoppingCart = await ShoppingCart.create({
              UserId: userFound.id, 
              total: total,
              AddressId: address
            });

            items.forEach(async (el) => {
              const laptop = await Laptop.findOne({ where: { id: el.id } });
              if (laptop) {
                await shoppingCart.addLaptops(laptop, {
                  through: {
                    quantity: el.quantity
                  }
                });
              }
            })
            
            await shoppingCart.save();
        
          } catch (error) {
            console.error( {error:error.message});
          }
        }

        await createShoppingCart(email, items, total)
      }
   
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something goes wrong" });
    }
};
