import { ShoppingCart } from '../../models/ShoppingCart.js';
import { User } from '../../models/User.js'
import { Laptop } from '../../models/Laptop.js';
import { Address } from '../../models/Address.js';
import { ShoppingCartLaptop } from '../../models/Laptop.js';


export const getShoppingCartsByUser = async (req, res) => {
    try {
        const email = req.params.email
        const userFound = await User.findOne({where: { email }})        
        const shoppingCartsFound = await ShoppingCart.findAll({ where: { UserId:userFound.id } });

        const shoppingCartsData = shoppingCartsFound.map(async (cart) => {
            const result = { laptops: [], total: cart.total };

            const laptops = await cart.getLaptops();

            for (const laptop of laptops) {
                const shoppingCartLaptop = await ShoppingCartLaptop.findOne({
                    where: { laptopId: laptop.id, shoppingCartId: cart.id }
                });

                result.laptops.push({ id:laptop.id, model: laptop.model, image:laptop.position1, quantity: shoppingCartLaptop.quantity });
            }

            return result;
        });
        const shoppingCartsDataResolved = await Promise.all(shoppingCartsData);

        return res.status(200).json(shoppingCartsDataResolved);
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}