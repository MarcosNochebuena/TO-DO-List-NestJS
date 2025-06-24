import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
  username: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(6, {message: 'La contraseña debe tener al menos 6 caracteres'})
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  email: string;
}


export class UpdateUserDto {
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
  username?: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(6, {message: 'La contraseña debe tener al menos 6 caracteres'})
  password?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  email?: string;
}
