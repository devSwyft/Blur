import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, MaxLength } from "class-validator";

export class CreatePostDto {
  @Length(3, 20)
  @IsString()
  @ApiProperty()
  public readonly author: string

  @MaxLength(200)
  @IsString()
  @ApiProperty()
  public readonly content: string
}