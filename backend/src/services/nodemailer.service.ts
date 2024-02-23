import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

type IEmail = {
  title: string;
  email: string;
  text: string;
};

@Injectable()
export class EmailService {
  public async send({ email, text, title }: IEmail) {
    try {
      const transporter = nodemailer.createTransport({
        port: 587,
        secure: false,
        host: 'localhost',
        auth: {
          user: 'user@example.com',
          pass: 'teste',
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
