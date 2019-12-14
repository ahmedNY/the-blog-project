import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { AddUserCommand } from './commands/user.addUser';
import { LoginUserCommand } from './commands/user.loginUser';
import { FindAllUsersQuery } from './queries/user.findAll';
import { UserQueriesController } from './controllers/queries.controller';
import { FindAllRolesQuery } from './queries/role.findAll';
import { FindAllPermissionsQuery } from './queries/permission.findAll';
import { FindUserByIdQuery } from './queries/user.findById';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User, Role, Permission])],
  providers: [UsersService, AddUserCommand, LoginUserCommand, FindAllUsersQuery, FindAllRolesQuery, FindAllPermissionsQuery, FindUserByIdQuery],
  exports: [UsersService, AddUserCommand, LoginUserCommand],
  controllers: [UserQueriesController],
})
export class UsersModule { }
