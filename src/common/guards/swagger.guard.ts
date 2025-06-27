import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class SwaggerGuard implements CanActivate {
  canActivate(): boolean {
    return process.env.NODE_ENV !== 'production';
  }
}
