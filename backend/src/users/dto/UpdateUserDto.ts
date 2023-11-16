import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
  @MaxLength(5000)
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly bio?: string

  @IsNumber()
  @ApiProperty()
  public readonly follower: number

  @IsNumber()
  @ApiProperty()
  public readonly following: number

  @IsString()
  @ApiProperty()
  public readonly avatar: string
}