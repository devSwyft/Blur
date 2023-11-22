import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsInt, IsPositive, IsString, Length, MaxLength } from "class-validator"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: 'posts'
})
export class Post {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    unsigned: true
  })
  @IsInt()
  @IsPositive()
  @ApiProperty()
  public readonly id: number

  @Column()
  @Length(3, 20)
  @IsString()
  @ApiProperty()
  public readonly author: string

  @Column()
  @MaxLength(200)
  @IsString()
  @ApiProperty()
  public readonly content: string

  @Column()
  @IsString()
  @ApiProperty()
  public readonly likes: string

  @CreateDateColumn({
    name: 'createat',
    type: 'timestamp'
  })
  @IsDate()
  @ApiProperty()
  public readonly createdAt: Date
}