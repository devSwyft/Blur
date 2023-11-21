import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor (
    private postsService: PostsService
  ) {}

  @Post()
  public async createPost (@Body() createPostDto: CreatePostDto) {

  }
}