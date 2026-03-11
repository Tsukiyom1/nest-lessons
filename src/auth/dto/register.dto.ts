import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
	@IsEmail({}, { message: "Некорректный email" })
	email: string;

	@IsString()
	@MinLength(6, { message: "Пароль должен состоять как минимум из 6 символов" })
	password: string;
	@IsString()
	@MinLength(1, { message: "Имя должно состоять как минимум из 1 символов" })
	name: string;
}
