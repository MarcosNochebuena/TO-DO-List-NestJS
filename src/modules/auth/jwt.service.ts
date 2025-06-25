import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTService {
  constructor(private jwtService: JwtService) {};

  async generateToken(payload: object): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
