import * as nodemailer from 'nodemailer';
import * as SendGrid from 'nodemailer-sendgrid-transport';
import { getEnvVariables } from '../environments/environment';


export class NodeMailer {


    private static initiateTransport() {
        return nodemailer.createTransport(SendGrid({
            auth: {
                api_key: getEnvVariables().sendgrid_api_key
            }
        }));
    }

    static sendMail(data: {to: [string], subject: string, html: string}): Promise<any> {
        return NodeMailer.initiateTransport().sendMail({
            from: 'nodejstest@yopmail.com',
            to: data.to,
            subject: data.subject,
            html: data.html
        });
    }
}