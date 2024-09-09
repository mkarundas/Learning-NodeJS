import { DevEnvironment } from "./environment.dev";
import { ProdEnvironment } from "./environment.prod";

export interface Environment {
    db_uri: string,
    sendgrid_api_key: string
    gmail_auth: {
        user: string,
        pass: string
    }
    jwt_secret_ket: string
}

export function getEnvVariables() {
    if(process.env.NODE_ENV === 'production') {
        return ProdEnvironment;
    }
    return DevEnvironment;
}