import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto, SignInDto, SignUpDto } from './auth.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: 200, description: 'User signed in successfully', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(@Body() body: SignInDto): Promise<AuthResponseDto> {
    return this.authService.signIn(body);
  }

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 200, description: 'User signed up successfully', type: AuthResponseDto })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async signUp(@Body() body: SignUpDto): Promise<AuthResponseDto> {
    return this.authService.signUp(body);
  }
}
