import { Module } from '@nestjs/common';
// import { UsersController } from './users/users.controller';
// import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
