import { Controller, Get, Body, Post, Req } from '@nestjs/common';
import { Permission } from '../entities/permission.entity';
import { AddUserCommand } from '../commands/user.addUser';
import { ChangeMyPasswordCommand } from '../commands/user.changeMyPassword';
import { ChangeUserPasswordCommand } from '../commands/user.changeUserPassword';
import { UpdateUserCommand } from '../commands/user.updateUser';
import { AddUserDTO } from '../dtos/addUser.dto';
import { ChangeMyPasswordDTO } from '../dtos/changeMyPassword.dto';
import { UpdateUserDTO } from '../dtos/updateUser.dto';
import { ChangeUserPasswordDTO } from '../dtos/changeUserPassword.dto';

@Controller('/api/queries')
export class UserQueriesController {
    constructor(
        private readonly addUserCommand: AddUserCommand,
        private readonly updateUserCommand: UpdateUserCommand,
        private readonly changeMyPasswordCommand: ChangeMyPasswordCommand,
        private readonly changeUserPasswordCommand: ChangeUserPasswordCommand,
    ) { }

    @Post('user.addUser')
    async user_addUser(@Body() dto: AddUserDTO): Promise<any> {
        return this.addUserCommand.execute(dto);
    }

    @Post('user.changeMyPassword')
    async user_changeMyPassword(@Body() dto: ChangeMyPasswordDTO, @Req() request): Promise<any> {
        return this.changeMyPasswordCommand.execute(dto, request.user);
    }

    @Post('user.changeUserPassword')
    async user_changeUserPassword(@Body() dto: ChangeUserPasswordDTO): Promise<any> {
        return this.changeUserPasswordCommand.execute(dto);
    }

    @Post('user.updateUser')
    async user_updateUser(@Body() dto: UpdateUserDTO): Promise<Permission[]> {
        return this.updateUserCommand.execute(dto);
    }
}
