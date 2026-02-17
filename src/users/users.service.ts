import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { IUser } from "src/interfaces/IUser.interface";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
	private users: IUser[] = [];
	private idCounter = 1;
	createUser(dto: CreateUserDto) {
		const user: IUser = {
			id: String(this.idCounter++),
			email: dto.email,
			password: dto.password,
		};

		console.log(user);

		this.users.push(user);
		return user;
	}

	findAllUsers(): IUser[] | null {
		return this.users;
	}

	findOneUser(id: string): IUser | undefined {
		console.log(typeof id, "id from service params");
		console.log(this.users);

		const user = this.users.find(user => {
			console.log(user, "user from find ");

			return user.id === id;
		});

		console.log(user, "one user");

		return user;
	}

	updateUser(id: string, dto: UpdateUserDto) {
		const index = this.users.findIndex(user => user.id === id);
		console.log(index, "index of user to update");
		if (index === -1) return false;
		this.users[index] = { ...this.users[index], ...dto };
		console.log(this.users[index], " updated user in service");

		return this.users[index];
	}

	removeUser(id: string): { success: boolean } {
		const index = this.users.findIndex(user => user.id === id);
		console.log(index);
		if (index === -1) return { success: false };
		this.users.splice(index, 1);
		return { success: true };
	}
}
