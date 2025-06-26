import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto, SignInDto, SignUpDto } from './auth.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  async signIn(@Body() body: SignInDto): Promise<AuthResponseDto> {
    return this.authService.signIn(body);
  }

  @Public()
  @Post('signup')
  async signUp(@Body() body: SignUpDto): Promise<AuthResponseDto> {
    return this.authService.signUp(body);
  }
}
