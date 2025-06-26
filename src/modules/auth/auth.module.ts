import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWTService } from './jwt.service';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/user.module';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '1h' },
    })}), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JWTService, { provide: APP_GUARD, useClass: AuthGuard}],
})
export class AuthModule {}
