import { User } from '../../models/User.js'

export const createUser = async (req, res) =>{
    try {
        const {name, family_name, email, picture, sub} =  req.body
        const [user, created] = await User.findOrCreate({
            where: { email: email || "" },
            defaults:{
                name,
                email,
                family_name,
                picture,
                sub
            }
        }); 
        if(created) return res.status(200).json(user)
        return res.status(200).json({message:"User exists"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const loginUser = async (req, res) =>{
    try {
        const {email} = req.body
        const user = await User.findOne({ where: { email } });
        if(!user) return res.status(500).json({error: "Unregistered user"})

        if(user.id){
            const token = Jwt.sign({email:email, admin: user.isAdmin}, process.env.SECRET_KEY, {
                expiresIn:'86400s'
            })
            return res.status(200).json({token})
        }
        else{
            return res.status(500).json({error: "Incorrect password"})
        }
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const deleteUser = async (req, res)=>{
    try{
        const id = req.params.id
        const userFound = await User.findByPk(id);
        if(userFound){
            await User.update(
                { visible: false },
                { where: { id } }
            );
            const userUpdated = await User.findByPk(id);
            return res.status(200).json(userUpdated) 
        }
        else{
            return res.status(200).json(user) 
        }
    }
    catch(error){
        return res.status(500).json({message:'Something goes wrong'})
    }
}

export const updateUser = async (req, res)=>{
    try{
        const id = req.params.id
        const {dni, name, email, family_name, confirmationEmail, picture, sub, visible, phone} = req.body
        const userFound = await User.findByPk(id);
        if(userFound){
            await User.update(
                { dni, name, email, family_name, confirmationEmail, picture, sub, visible, phone },
                { where: { id } }
            );
            const userUpdated = await User.findByPk(id);
            return res.status(200).json(userUpdated) 
        }
        else{
            return res.status(200).json({message:'User not Found'}) 
        }
    }
    catch(error){
        return res.status(500).json({message:'Something goes wrong'})
    }
}