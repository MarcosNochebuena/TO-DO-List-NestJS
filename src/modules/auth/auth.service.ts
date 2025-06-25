import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto, SignInDto, SignUpDto } from './auth.dto';
import { UserService } from '../users/user.service';
import { JWTService } from './jwt.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JWTService
  ) {}

  async signIn(userCredentials: SignInDto): Promise<AuthResponseDto> {
    const { username, password } = userCredentials;
    const userFound = await this.validateCredentials(username, password);
    const userToken = await this.jwtService.generateToken({ id: userFound.id, username: userFound.username });
    return { message: `Bienvenido de nuevo, ${userFound.username}!`, token: userToken };
  }

  async signUp(userInfo: SignUpDto): Promise<AuthResponseDto> {
    const newUser = await this.userService.createUser(userInfo);
    const userToken = await this.jwtService.generateToken({ id: newUser.id, username: newUser.username });
    return { message: `Usuario ${newUser.username} creado correctamente!`, token: userToken };
  }

  async validateCredentials(username: string, password: string): Promise<User> {
    const userFound = await this.userService.findByUsername(username);
    const isPasswordValid = await userFound?.comparePassword(password);
    if (!userFound || !isPasswordValid) {
      throw new UnauthorizedException('Credenciales invalidas');
    }
    return userFound;
  }
}
