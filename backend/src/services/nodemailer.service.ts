import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

type IEmail = {
  title: string;
  email: string;
  text: string;
};

@Injectable()
export class EmailService {
  public async send({ email, text, title }: IEmail) {
    dotenv.config();
    try {
      const transporter = nodemailer.createTransport({
        port: process.env.EMAIL_PORT as unknown as number,
        secure: process.env.EMAIL_SECURE as unknown as boolean,
        host: process.env.EMAIL_HOST as unknown as string,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        to: email,
        subject: title,
        html: text,
      });

      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
    }
  }
}
