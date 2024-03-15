import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'Texto do post', required: false })
  @IsOptional()
  @IsString()
  text: string;

  @ApiProperty({ description: 'Imagem do post', required: false })
  @IsOptional()
  @IsString()
  img: string | any;
}

export class CreatePostComment {
  @ApiProperty({ description: 'Texto do comentário', required: true })
  @IsString()
  @IsNotEmpty()
  text: string;
}
