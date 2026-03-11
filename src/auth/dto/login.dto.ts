import { IsEmail, MinLength } from "class-validator";

export class LoginDto {
	@IsEmail({}, { message: "Некорректный email" })
	email: string;

	@MinLength(6, { message: "Пароль должен состоять как минимум из 6 символов" })
	password: string;
}
