import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Por favor, insira um endereço de e-mail válido.' })
  @IsString({ message: 'O campo de e-mail deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo de e-mail não pode estar vazio.' })
  email: string;

  @IsString({ message: 'O campo de nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo de nome não pode estar vazio.' })
  name: string;

  @IsString({ message: 'O campo de senha deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo de senha não pode estar vazio.' })
  password: string;
}

export class LoginUserDto {
  @IsEmail({}, { message: 'Por favor, insira um endereço de e-mail válido.' })
  @IsString({ message: 'O campo de e-mail deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo de e-mail não pode estar vazio.' })
  email: string;

  @IsString({ message: 'O campo de senha deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo de senha não pode estar vazio.' })
  password: string;
}
