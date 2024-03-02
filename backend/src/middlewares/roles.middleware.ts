import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RedisService } from 'src/services/redis.service';

@Injectable()
export class InterceptorJwt implements NestInterceptor {
  constructor(private readonly redisService: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest() as Request;
    const headers = request.headers;
    const jwt = headers.token;
    if (jwt === undefined) {
      throw new HttpException('Token não fornecido', HttpStatus.UNAUTHORIZED);
    }
    const token = await this.redisService.getValue(jwt as string);
    request.body.token = token;
    if (request.body.token === null) {
      throw new HttpException('Sessão expirada', HttpStatus.UNAUTHORIZED);
    }
    return next.handle();
  }
}
