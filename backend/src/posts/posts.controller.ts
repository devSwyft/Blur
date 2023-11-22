import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common'
import { PostsService } from './posts.service'
import { ApiTags } from '@nestjs/swagger'
import { CreatePostDto } from './dto/CreatePostDto'
import { AuthGuard } from 'src/auth/auth.guard'

@ApiTags('posts')
@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
  constructor (
    private postsService: PostsService
  ) {}

  @Post()
  public async createPost(@Body() createPostDto: CreatePostDto) {
    await this.postsService.createPost(createPostDto)

    return {
      success: true
    }
  }

  @Get()
  public async findAllPost() {
    const posts = await this.postsService.findAllPost()

    return {
      success: true,
      body: posts
    }
  }

  @Get(':postId')
  public async findPost(@Param('postId') postId: number) {
    const post = await this.postsService.findPost(postId)

    if (post === undefined) {
      throw new NotFoundException({
        success: false,
        message: 'Post not found.'
      })
    }

    return {
      success: true,
      body: post
    }
  }
}