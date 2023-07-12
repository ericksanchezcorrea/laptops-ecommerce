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
                visible: laptop.visible,
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
                    visible: p.visible,
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

        const laptopFound = await Laptop.findOne({where:{model: p.model}} )
        if(laptopFound) return res.status(404).json({error : 'This model already exists'})   
    
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

export const updateLaptop = async (req, res) =>{
    try {
        const {id} = req.params
        const {brand, model, sku, height, width, offert, price, processor, type_of_hard_drive, hard_drive_capacity, ram, wi_fi, resolution, position1, position2, position3, position4, position5, stock, visible} =  req.body   
    
        const laptopFound = await Laptop.findOne({where:{id}});
        if(!laptopFound) return res.status(404).json({error: "Laptop not found"})

        const updateFields = {}
        if (stock && typeof stock !== 'undefined' && typeof stock === 'number') updateFields.stock = stock
        if (price && typeof price !== 'undefined' && typeof price === 'number') updateFields.price = price
        if (offert && typeof offert !== 'undefined' && typeof offert === 'number') updateFields.offert = offert
        if (brand && typeof brand !== 'undefined') updateFields.brand = brand
        if (model && typeof model !== 'undefined') updateFields.model = model
        if (sku && typeof sku !== 'undefined') updateFields.sku = sku
        if (height && typeof height !== 'undefined') updateFields.height = height
        if (width && typeof width !== 'undefined') updateFields.width = width
        if (processor && typeof processor !== 'undefined') updateFields.processor = processor
        if (type_of_hard_drive && typeof type_of_hard_drive !== 'undefined') updateFields.type_of_hard_drive = type_of_hard_drive
        if (hard_drive_capacity && typeof hard_drive_capacity !== 'undefined') updateFields.hard_drive_capacity = hard_drive_capacity
        if (ram && typeof ram !== 'undefined') updateFields.ram = ram
        if (wi_fi && typeof wi_fi !== 'undefined') updateFields.wi_fi = wi_fi
        if (resolution && typeof resolution !== 'undefined') updateFields.resolution = resolution
        if (position1 && typeof position1 !== 'undefined') updateFields.position1 = position1
        if (position2 && typeof position2 !== 'undefined') updateFields.position2 = position2
        if (position3 && typeof position3 !== 'undefined') updateFields.position3 = position3
        if (position4 && typeof position4 !== 'undefined') updateFields.position4 = position4
        if (position5 && typeof position5 !== 'undefined') updateFields.position5 = position5
        if (typeof visible === 'boolean') updateFields.visible = visible

        await Laptop.update(
            updateFields,
            {where:{id}}
        );

        return res.status(200).json({message: 'ok'})
        
    } catch (error) {
        console.log(error.message)
        return res.status(404).json({error : error.message})   
    }
   
}

export const deleteLaptop = async (req, res) =>{
    try {
        const {id} = req.params
        const laptopFound = await Laptop.findOne({where:{id}});
        if(!laptopFound) return res.status(200).json({error: "Laptop not found"})
    
        await Laptop.update(
            { visible: false },
            { where: { id } }
        );
    
        const laptopUpdated = await Laptop.findByPk(id);
        console.log(laptopUpdated)
        return res.status(200).json({message: 'ok'})

    } catch (error) {
        return res.status(404).json({error : error.message})   
    }
}