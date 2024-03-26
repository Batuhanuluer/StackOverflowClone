import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';


export class EmailSend {
    private transporter: nodemailer.Transporter;

    constructor() {
        dotenv.config(); // dotenv modülünü kullanarak .env dosyasını yükle
        // E-posta gönderimi için transporter oluştur
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
        // E-posta gönderme işlemi
        const mailOptions = {
            from: 'your-email@gmail.com', // Gönderen e-posta adresi
            to: email, // Alıcı e-posta adresi
            subject: 'Hesap Doğrulama', // E-posta konusu
            html: `<p>Hesabınızı doğrulamak için <a href="${verificationLink}">buraya tıklayın</a></p>` // HTML içeriği
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('E-posta gönderildi:', email);
        } catch (error) {
            console.error('E-posta gönderirken hata oluştu:', error);
            throw new Error('E-posta gönderirken bir hata oluştu');
        }
    }
}