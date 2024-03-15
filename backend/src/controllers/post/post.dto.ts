import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  img: string | any;
}

export class CreatePostComment {
  @IsString()
  @IsNotEmpty()
  text: string;
}
