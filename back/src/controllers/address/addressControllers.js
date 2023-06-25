import { Address } from '../../models/Address.js'
import { User } from '../../models/User.js'

export const getAddressesByEmail = async (req, res) => {
    try {
        const email = req.params.email
        const user = await User.findOne({ where: { email: email} });
        if(user) {
            const addresses = await user.getAddresses({ where: { visible: true } });
            return res.status(200).json(addresses)
        } else {
            return res.status(500).json({error: "User is not exists"})
        }
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const createAddress = async (req, res) => {
    try {
        const { city, country, postalCode, reference, state, street, email } = req.body;
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const address = await Address.create({
            city,
            country,
            postalCode,
            reference,
            state,
            street,
            UserId: user.id
        });

        return res.status(200).json({ success: 'Dirección agregada correctamente', address });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteAddress = async (req, res) =>{
    try {
        const id = req.params.id
        const addressFound = await Address.findOne({where:{id}});

        if(!addressFound) return res.status(200).json({error: "Address not found"})

        await Address.update(
            { visible: false },
            { where: { id } }
        );

        const addressUpdated = await Address.findByPk(id);
        return res.status(200).json(addressUpdated) 
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const updateAddress = async (req, res) =>{
    try {
        const { street, state, country, postalCode, reference, city } = req.body
        const id = req.params.id
        const addressFound = await Address.findOne({where:{id}});

        if(!addressFound) return res.status(200).json({error: "Address not found"})

        await Address.update(
            { street, state, country, postalCode, reference, city },
            { where: { id } }
        );

        const addressUpdated = await Address.findByPk(id);
        return res.status(200).json(addressUpdated) 
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

// actualizar propiedad confirmationAddress de User con el ID
// 