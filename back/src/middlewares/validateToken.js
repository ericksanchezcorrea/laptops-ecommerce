import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import admin from 'firebase-admin'
import { FIREBASE_CREDENTIAL_type, FIREBASE_CREDENTIAL_project_id, FIREBASE_CREDENTIAL_private_key_id, FIREBASE_CREDENTIAL_private_key,  FIREBASE_CREDENTIAL_client_email, FIREBASE_CREDENTIAL_client_id, FIREBASE_CREDENTIAL_auth_uri, FIREBASE_CREDENTIAL_token_uri, FIREBASE_CREDENTIAL_auth_provider_x509_cert_url, FIREBASE_CREDENTIAL_client_x509_cert_url, FIREBASE_CREDENTIAL_universe_domain } from "../config.js";

const { privateKey  }  =  JSON.parse(FIREBASE_CREDENTIAL_private_key)
// private_key_id: FIREBASE_CREDENTIAL_private_key_id,


initializeApp({
    // credential: applicationDefault(),
    credential: cert({
        type: FIREBASE_CREDENTIAL_type,
        project_id: FIREBASE_CREDENTIAL_project_id,
        privateKey,
        private_key: FIREBASE_CREDENTIAL_private_key,
        client_email: FIREBASE_CREDENTIAL_client_email,
        client_id: FIREBASE_CREDENTIAL_client_id,
        auth_uri: FIREBASE_CREDENTIAL_auth_uri,
        token_uri: FIREBASE_CREDENTIAL_token_uri,
        auth_provider_x509_cert_url: FIREBASE_CREDENTIAL_auth_provider_x509_cert_url,
        client_x509_cert_url: FIREBASE_CREDENTIAL_client_x509_cert_url,
        universe_domain: FIREBASE_CREDENTIAL_universe_domain
      }),
});

export const validateToken = async (req, res, next) =>{
    const headerToken = req.headers['authorization']
    const {uid} = req.params
    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        try {
            if(headerToken && headerToken.startsWith('Bearer ')){
                const bearerToken = headerToken.slice(7)
                const authUser = await admin.auth().verifyIdToken(bearerToken)
                if(authUser.uid !== uid) return res.status(403).json({message:'You do not have permissions'})
                next()
            }
        } catch (error) {
            return res.status(404).json(error)
        }
    }
    else{
        res.status(403).json({
            message:'No token provided'
        })
    }
}