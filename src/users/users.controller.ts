import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiKeyGuard } from "src/common/gurads/api-key.guard";

@UseGuards(ApiKeyGuard)
@Controller("/users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post("/create")
	create(@Body() createUser: CreateUserDto) {
		return this.usersService.createUser(createUser);
	}

	@Get("/get/all/user")
	findAll() {
		return this.usersService.findAllUsers();
	}

	@Get("/get/one/user/:id")
	findOne(@Param("id") id: string) {
		console.log(id, "id");

		const user = this.usersService.findOneUser(id);
		if (!user) {
			throw new NotFoundException(
				"Пользователь с таким id " + id + "не найден",
			);
		}

		return user;
	}

	@Patch("/update/one/user/:id")
	update(@Param("id") id: string, @Body() updateData: UpdateUserDto) {
		const user = this.usersService.updateUser(id, updateData);
		console.log(user, "updated user");

		if (!user) {
			throw new NotFoundException(
				"Пользователь с таким id " + id + "не найден",
			);
		}
		return user;
	}

	@Delete("/delete/one/user/:id")
	remove(@Param("id") id: string) {
		const removedUser = this.usersService.removeUser(id);
		if (!removedUser) {
			throw new NotFoundException(
				"Пользователь с таким id " + id + "не найден",
			);
		}

		return removedUser;
	}
}
