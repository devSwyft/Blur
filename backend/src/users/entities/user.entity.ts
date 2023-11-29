import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsDate, IsHexadecimal, IsInt, IsOptional, IsPositive, IsString, Length, MaxLength } from 'class-validator'
import { Post } from 'src/posts/entities/post.entity'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    unsigned: true
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
  @IsString()
  @ApiProperty()
  public readonly follower: string

  @Column()
  @IsString()
  @ApiProperty()
  public readonly following: string

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

  @OneToMany(() => Post, (p) => p.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @ApiProperty()
  public readonly posts: Post[]
}