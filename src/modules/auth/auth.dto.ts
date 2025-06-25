import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}

export class SignUpDto extends SignInDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class AuthResponseDto {
  message: string;
  token: string;
}
