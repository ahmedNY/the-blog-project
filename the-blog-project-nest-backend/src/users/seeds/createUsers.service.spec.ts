import { Test, TestingModule } from '@nestjs/testing';
import { AddUserCommand } from '../commands/user.addUser';
import { AddUserDTO } from '../dtos/addUser.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { LoginUserCommand } from '../commands/user.loginUser';

describe('UsersService', () => {
  let addUserCommand: AddUserCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User, Role, Permission])],
      providers: [AddUserCommand, LoginUserCommand],
      exports: [AddUserCommand, LoginUserCommand],
    }).compile();

    addUserCommand = module.get<AddUserCommand>(AddUserCommand);
  });

  it('should add user', async () => {
    expect('addUserCommand').toBeDefined();
    const dto: AddUserDTO = {
      displayName: 'Administrator',
      password: '1234',
      mobileNumber: '0912341234',
    };
    await addUserCommand.execute(dto);
  });
});
