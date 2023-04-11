import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, {Transporter} from "nodemailer"

@injectable()
class EtherealMailProvider implements IMailProvider{
    private client: Transporter
    constructor(){
        nodemailer.createTestAccount().then(account=>{
            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: account.user, // generated ethereal user
                  pass: account.pass, // generated ethereal password
                },
            });

            this.client = transporter
        })
        .catch((err)=>console.log(err))
    }
    async sendMail(to: string, subject: string, body: string): Promise<void> {
        const message = await this.client.sendMail({
            to,
            subject,
            from: "Rentx <noreplay@rentx.com.br>",
            text: body,
            html: body
        })
        console.log("Message sent: %s", message.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
       
    }

}

export {EtherealMailProvider}