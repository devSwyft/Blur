import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsInt, IsPositive, IsString, MaxLength } from 'class-validator'
import { Comment } from 'src/comments/entities/comment.entity'
import { User } from 'src/users/entities/user.entity'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

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

  @Column({
    name: 'userId',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  public readonly userId: number

  @ManyToOne(() => User, (u) => u.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id'
  })
  @ApiProperty()
  public readonly user: User

  @OneToMany(() => Comment, (c) => c.post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @ApiProperty()
  public readonly comments: Comment[]
}