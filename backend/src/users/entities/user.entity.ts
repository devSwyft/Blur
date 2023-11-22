import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsHexadecimal, IsInt, IsOptional, IsPositive, IsString, Length, MaxLength } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    unsigned: true,
  })
  @IsInt()
  @IsPositive()
  @ApiProperty()
  public readonly id: number

  @Column({
    unique: true,
  })
  @Length(3, 20)
  @IsString()
  @ApiProperty()
  public readonly login: string

  @Column({
    select: false,
  })
  @IsString()
  @IsHexadecimal()
  @Length(128, 128)
  @ApiProperty()
  public readonly password: string

  @Column()
  @IsString()
  @MaxLength(5000)
  @IsOptional()
  @ApiPropertyOptional()
  public readonly bio?: string

  @Column()
  @IsInt()
  @ApiProperty()
  public readonly follower: number

  @Column()
  @IsInt()
  @ApiProperty()
  public readonly following: number

  @Column()
  @IsString()
  @ApiProperty()
  public readonly avatar: string

  @Column({
    select: false
  })
  @IsString()
  @Length(8, 8)
  @ApiProperty()
  public readonly salt: string

  @CreateDateColumn({
    name: 'createdat',
    type: 'timestamp'
  })
  @IsDate()
  @ApiProperty()
  public readonly createdAt: Date
}