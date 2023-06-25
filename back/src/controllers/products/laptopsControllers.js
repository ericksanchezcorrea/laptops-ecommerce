import data from '../../data.js'
import {Laptop} from '../../models/Laptop.js'
import {Address} from '../../models/Address.js'

export const  getLaptops = async (req, res)=>{
    try{
        const {id} = req.query

        if(id){
            let laptop = await Laptop.findByPk(id);
            const newLaptop = {
                id: laptop.id,
                stock: laptop.stock,
                specifications:{
                    brand: laptop.brand,
                    model:laptop.model,
                    sku: laptop.sku,
                    height: laptop.height,
                    width: laptop.width,
                    offert: laptop.offert,
                    price: laptop.price,
                    processor: laptop.processor,
                    type_of_hard_drive: laptop.type_of_hard_drive,
                    hard_drive_capacity: laptop.hard_drive_capacity,
                    ram: laptop.ram,
                    wi_fi: laptop.wi_fi,
                    resolution: laptop.wi_fi,
                },
                images:{
                    position1: laptop.position1,
                    position2: laptop.position2,
                    position3: laptop.position3,
                    position4: laptop.position4,
                    position5: laptop.position5,
                }
            }
            return res.status(200).json(newLaptop)
        }
        else{
            let laptops = await Laptop.findAll();
            laptops = laptops.map((p) => {
                return{
                    id: p.id,
                    stock: p.stock,
                    specifications:{
                        brand: p.brand,
                        model:p.model,
                        sku: p.sku,
                        height: p.height,
                        width: p.width,
                        offert: p.offert,
                        price: p.price,
                        processor: p.processor,
                        type_of_hard_drive: p.type_of_hard_drive,
                        hard_drive_capacity: p.hard_drive_capacity,
                        ram: p.ram,
                        wi_fi: p.wi_fi,
                        resolution: p.wi_fi,
                    },
                    images:{
                        position1: p.position1,
                        position2: p.position2,
                        position3: p.position3,
                        position4: p.position4,
                        position5: p.position5,
                    }
                }
            })
            return res.status(200).json(laptops)
        }
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
}

export const  createAllLaptops = async (req, res)=>{
    try{
        data.map( async (p)=>{
            await Laptop.create({ 
                brand: p.specifications.brand,
                model:p.specifications.model,
                sku: p.specifications.sku,
                height: p.specifications.height,
                width: p.specifications.width,
                offert: p.specifications.offert,
                price: p.specifications.price,
                processor: p.specifications.processor,
                type_of_hard_drive: p.specifications.type_of_hard_drive,
                hard_drive_capacity: p.specifications.hard_drive_capacity,
                ram: p.specifications.ram,
                wi_fi: p.specifications.wi_fi,
                resolution: p.specifications.resolution,
                position1: p.images.position1,
                position2: p.images.position2,
                position3: p.images.position3,
                position4: p.images.position4,
                position5: p.images.position5,
                stock: p.stock
             });
        })
        return res.status(200).json(data)
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
}

export const createNewLaptop = async (req, res) =>{
    try {
        const p = req.body
    
        const laptopCreated = await Laptop.create({ 
            brand: p.brand === '' ? null: p.brand ,
            model:p.model === '' ? null : p.model,
            sku: p.sku === '' ? null : p.sku,
            height: p.model === '' ? null : p.height,
            width: p.width === '' ? null : p.width,
            offert: p.offert === '' ? null : p.offert,
            price: p.price === '' ? null : p.price,
            processor: p.processor === '' ? null : p.processor,
            type_of_hard_drive: p.type_of_hard_drive === '' ? null : p.type_of_hard_drive,
            hard_drive_capacity: p.hard_drive_capacity === '' ? null : p.hard_drive_capacity,
            ram: p.ram === '' ? null : p.ram,
            wi_fi: p.wi_fi === '' ? null : p.wi_fi,
            resolution: p.price === '' ? null : p.resolution,
            position1: p.position1 === '' ? null : p.position1,
            position2: p.position2 === '' ? null : p.position2,
            position3: p.position3 === '' ? null : p.position3,
            position4: p.position4,
            position5: p.position5,
            stock: p.stock === '' ? null : p.stock
        })

    
        return res.status(200).json(laptopCreated)
    } catch (error) {
        return res.status(404).json({error : error.message})   
    }


}
