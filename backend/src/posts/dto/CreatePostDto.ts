import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, MaxLength } from "class-validator";

export class CreatePostDto {
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  public readonly content: string
}