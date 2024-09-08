import { Environment } from "./environment";

export const DevEnvironment: Environment = {
    db_uri: 'mongodb://localhost:27017/SwiggyCloneApp',
    sendgrid_api_key: '',
    gmail_auth: {
        user: '',
        pass: ''
    }
}