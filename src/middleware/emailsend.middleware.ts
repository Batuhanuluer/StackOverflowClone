import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';


export class EmailSend {
    private transporter: nodemailer.Transporter;

    constructor() {
        dotenv.config();

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL}`, // Gönderen e-posta adresi
                pass: `${process.env.EMAIL_PASSWORD}`
            }
        });
    }

     async sendVerificationEmail(email: string, token: string): Promise<void> {
        const verificationLink = `http://localhost:3000/user/verify/${token}`
        const mailOptions = {
            from: 'company_mail@gmail.com', 
            to: email, 
            subject: 'Account Verification', 
            html: `<p>Click Here to verify your account <a href="${verificationLink}"></a></p>`
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', email);
        } catch (error) {
            console.error('An error occurred while sending email :', error);
            throw new Error('An error occurred while sending email');
        }
    }
}