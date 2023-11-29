import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthMiddleware } from 'src/auth/auth.middleware'
import { AuthModule } from 'src/auth/auth.module'
import { CommentsModule } from 'src/comments/comments.module'
import { PostsModule } from 'src/posts/posts.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST', 'db'),
        port: configService.get('DATABASE_PORT', 3306),
        username: configService.get('DATABASE_USERNAME', 'blur'),
        password: configService.get('DATABASE_PASSWORD', 'blurpassword'),
        database: configService.get('DATABASE_SCHEMA', 'blur'),
        synchronize: configService.get('DATABASE_SYNC', true),
        autoLoadEntities: true
      })
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    AuthModule
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*')
  }
}