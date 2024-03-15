import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Endereço de e-mail válido.',
  })
  @IsEmail({}, { message: 'Por favor, insira um endereço de e-mail válido.' })
  @IsString({ message: 'O campo de e-mail deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo de e-mail não pode estar vazio.' })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'Nome do usuário.' })
  @IsString({ message: 'O campo de nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo de nome não pode estar vazio.' })
  name: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário.' })
  @IsString({ message: 'O campo de senha deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo de senha não pode estar vazio.' })
  password: string;
}

export class LoginUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Endereço de e-mail válido.',
  })
  @IsEmail({}, { message: 'Por favor, insira um endereço de e-mail válido.' })
  @IsString({ message: 'O campo de e-mail deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo de e-mail não pode estar vazio.' })
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário.' })
  @IsString({ message: 'O campo de senha deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo de senha não pode estar vazio.' })
  password: string;
}
