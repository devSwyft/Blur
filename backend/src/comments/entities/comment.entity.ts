import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsPositive, IsString, MaxLength } from 'class-validator'
import { Post } from 'src/posts/entities/post.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'comments'
})
export class Comment {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    unsigned: true
  })
  @IsInt()
  @IsPositive()
  @ApiProperty()
  public readonly id: number

  @Column()
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  public readonly content: string

  @Column({
    name: 'postId',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  public readonly postId: number

  @ManyToOne(() => Post, (p) => p.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn({
    name: 'postId',
    referencedColumnName: 'id'
  })
  @ApiProperty()
  public readonly post: Post
}