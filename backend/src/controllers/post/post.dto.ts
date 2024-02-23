import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  img: string | any;
}
