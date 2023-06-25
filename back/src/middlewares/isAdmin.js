import admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'

const db = getFirestore()

export const isAdmin = async (req, res, next) =>{
    const headerToken = req.headers['authorization']
    const {uid} = req.params

    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        try {
            if(headerToken && headerToken.startsWith('Bearer ')){
                const bearerToken = headerToken.slice(7)
                const authUser = await admin.auth().verifyIdToken(bearerToken)
                if(authUser.uid !== uid) return res.status(403).json({message:'You do not have permissions'})
                
                // valida si es admin
                const results =  await db.collection('users').doc(uid).get()
                const rol = results.data().rol
                
                if(rol === 'admin') next()
                else return res.status(403).json({ message: 'User is not admin' });
                  
                // const results =  await db.collection('users').get()
                // const data = results.docs
                // console.log(data[1].data())
            }
        } catch (error) {
            return res.status(404).json({message: error.message})
        }
    }
    else{
        res.status(403).json({
            message:'No token provided'
        })
    }
}