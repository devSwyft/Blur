import { Body, Controller, Get, NotFoundException, Param, Post, Res, UseGuards } from '@nestjs/common'
import { PostsService } from './posts.service'
import { ApiTags } from '@nestjs/swagger'
import { CreatePostDto } from './dto/CreatePostDto'
import { AuthGuard } from 'src/auth/auth.guard'
import { Response } from 'express'

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor (
    private postsService: PostsService
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  public async createPost(@Res({ passthrough: true }) res: Response, @Body() createPostDto: CreatePostDto) {
    const userId = res.locals.userId
    await this.postsService.createPost(userId, createPostDto)

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