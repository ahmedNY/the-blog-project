import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/users/services/authorization.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly authorizationService: AuthorizationService,
        private readonly reflector: Reflector,
    ) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roleUrl = this.reflector.get<string>('role', context.getHandler());
        if (!roleUrl) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        return this.authorizationService.checkUserRole(request.user.id, roleUrl);
    }
}
