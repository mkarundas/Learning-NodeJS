import { Environment } from "./environment";

export const ProdEnvironment: Environment = {
    db_uri: '',
    sendgrid_api_key: '',
    gmail_auth: {
        user: '',
        pass: ''
    },
    jwt_secret_ket: 'secret_key_production'
}