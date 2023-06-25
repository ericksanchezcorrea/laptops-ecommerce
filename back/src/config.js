import { config } from "dotenv";
config()
// DB CONFIG
export const PORT = process.env.PORT || 4000
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_PORT = process.env.DB_PORT || 5432
export const DB_USER = process.env.DB_USER || 'postgres'
export const DB_DATABASE = process.env.DB_DATABASE || 'sale-of-laptops'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'admin'

// MERCADO PAGO CONFIG
export const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN

// FIREBASE CONFIG
export const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS
export const FIREBASE_CREDENTIAL_type = process.env.FIREBASE_CREDENTIAL_type
export const FIREBASE_CREDENTIAL_project_id = process.env.FIREBASE_CREDENTIAL_project_id
export const FIREBASE_CREDENTIAL_private_key_id = process.env.FIREBASE_CREDENTIAL_private_key_id
export const FIREBASE_CREDENTIAL_private_key = process.env.FIREBASE_CREDENTIAL_private_key
export const FIREBASE_CREDENTIAL_client_email = process.env.FIREBASE_CREDENTIAL_client_email
export const FIREBASE_CREDENTIAL_client_id = process.env.FIREBASE_CREDENTIAL_client_id
export const FIREBASE_CREDENTIAL_auth_uri = process.env.FIREBASE_CREDENTIAL_auth_uri
export const FIREBASE_CREDENTIAL_token_uri = process.env.FIREBASE_CREDENTIAL_token_uri
export const FIREBASE_CREDENTIAL_auth_provider_x509_cert_url = process.env.FIREBASE_CREDENTIAL_auth_provider_x509_cert_url
export const FIREBASE_CREDENTIAL_client_x509_cert_url = process.env.FIREBASE_CREDENTIAL_client_x509_cert_url
export const FIREBASE_CREDENTIAL_universe_domain = process.env.FIREBASE_CREDENTIAL_universe_domain

// BASE URL FRONT
export const BASE_URL_FRONT = process.env.BASE_URL_FRONT || 'http://localhost:3000'
export const BASE_URL_BACK = process.env.BASE_URL_BACK || 'http://localhost:4000'