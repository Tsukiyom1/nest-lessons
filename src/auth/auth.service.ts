import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async register(registerDto: RegisterDto) {
		const existingEmail = await this.prisma.users.findUnique({
			where: { email: registerDto.email },
		});

		if (existingEmail) {
			throw new ConflictException("Пользователь с таким email уже существует");
		}

		const hashedPassword = await bcrypt.hash(registerDto.password, 10);

		const user = await this.prisma.users.create({
			data: {
				email: registerDto.email,
				password: hashedPassword,
				name: registerDto.name,
			},
		});

		const { password, ...register } = user;

		const token = this.jwtService.sign({ sub: user.id, email: user.email });
		return {
			user: register,
			access_token: token,
		};
	}

	async login(dto: LoginDto) {
		const existingEmail = await this.prisma.users.findUnique({
			where: { email: dto.email },
		});

		console.log(existingEmail, "existing email from login");

		if (!existingEmail) {
			throw new ConflictException("Неверный логин или пароль ");
		}

		console.log(dto.password, "dto pass");

		const isMatch = await bcrypt.compare(dto.password, existingEmail.password);

		console.log(isMatch, "ismatch");

		if (!isMatch) {
			throw new ConflictException("Неверный логин или пароль");
		}

		const { password, ...user } = existingEmail;

		const token = this.jwtService.sign({
			sub: existingEmail.id,
			email: existingEmail.email,
		});

		console.log(token, "token");

		return {
			user,
			token,
		};
	}
}
