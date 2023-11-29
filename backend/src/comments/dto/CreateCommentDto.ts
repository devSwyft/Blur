import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class CreateCommentDto {
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  public readonly content: string
}