import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { Repository } from 'typeorm'
import { CreatePostDto } from './dto/CreatePostDto'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly posts: Repository<Post>
  ) {}

  public async createPost(userId: number, createPostDto: CreatePostDto): Promise<void> {
    await this.posts.insert({
      userId,
      content: createPostDto.content,
      likes: '[]'
    })
  }

  public async findAllPost(): Promise<Post[]> {
    return await this.posts.find()
  }

  public async findPost(id: number): Promise<Post | undefined> {
    return await this.posts.findOne({
      where: { id }
    }) ?? undefined
  }
}