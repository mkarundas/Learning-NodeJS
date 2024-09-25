import { Utils } from "../Utils/Utils";
import { Environment } from "./environment";

Utils.dotenvConfigs();
export const DevEnvironment: Environment = {
    db_uri: process.env.DEV_DB_URI,
    sendgrid_api_key: '',
    gmail_auth: {
        user: '',
        pass: ''
    },
    jwt_secret_ket: 'secret_key'
}