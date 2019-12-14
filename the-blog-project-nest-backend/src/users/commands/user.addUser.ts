import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { AddUserDTO } from "../dtos/addUser.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AddUserCommand {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    execute(dto: AddUserDTO): any {
        const user = this.userRepository.create(dto);
        // generate hash in password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(dto.password, salt);
        user.password = hash;
        user.roles = [];
        // save user
        this.userRepository.save(user);
        return { success: true, message: 'User added successfully' }
    }
}
