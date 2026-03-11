import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
// import { UsersController } from './users/users.controller';
// import { UsersService } from './users/users.service';
import { UsersModule } from "./users/users.module";
import { CommentsModule } from "./comments/comments.module";
import { LoggingMiddleware } from "./common/middleware/logging.middleware";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [UsersModule, CommentsModule, PrismaModule, AuthModule],
	controllers: [],
	providers: [PrismaModule],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggingMiddleware).forRoutes("*");
	}
}
