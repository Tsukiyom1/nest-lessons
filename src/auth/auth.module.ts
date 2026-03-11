import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
@Module({
	imports: [
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: "mysecretkey",
			// ensure expiresIn is a valid type (string or number). using '7d' as default
			signOptions: { expiresIn: 604800 },
		}),
		PrismaModule, // make PrismaService available
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}
