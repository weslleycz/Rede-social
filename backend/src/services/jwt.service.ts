import { Injectable } from '@nestjs/common';
import { sign, verify, decode, Secret } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JWTService {
  private secretKey: Secret;

  constructor() {
    this.secretKey = process.env.Security_JWT;
  }

  public login(id: string): string {
    const payload = { data: id };
    return sign(payload, this.secretKey, { expiresIn: '72h' });
  }

  public verify(token: string): boolean {
    try {
      verify(token, this.secretKey);
      return true;
    } catch (err) {
      return false;
    }
  }

  public decode(token: string) {
    const tokenJwt = token.substring(7);
    return decode(tokenJwt);
  }
}
