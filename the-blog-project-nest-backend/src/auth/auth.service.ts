import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        // check user exists
        if (!user) {
            return null;
        }

        // check user password
        if (!compareSync(pass, user.password)) {
            return null;
        }

        // remove password
        delete user.password;
        return user;
    }

    async generateLoginResponse(user: User) {
        // this is called after user successfully login, and current user is instantiated
        // we should return the response after user logged in here such as token and user profiles
        const currentUser = await this.usersService.findUserWithRolesAndPermissions(user.mobileNumber);
        const permissions = [];
        currentUser.roles.forEach(r => permissions.push(...r.permissions));
        const roles = currentUser.roles;

        // preparing the payload
        const jwtPayload: JwtPayload = {
            id: user.id,
            mobileNumber: user.mobileNumber,
            displayName: user.displayName,
            createdAt: user.createdAt,
        };

        // generate JWT token
        const jwt = this.jwtService.sign(jwtPayload, { expiresIn: '1 day' });

        return {
            token: jwt,
            user: jwtPayload,
            roles,
            permissions,
        };
    }
}
