import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/users/services/authorization.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private readonly authorizationService: AuthorizationService,
        private readonly reflector: Reflector,
    ) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const permissionUrl = this.reflector.get<string>('permission', context.getHandler());
        if (!permissionUrl) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            return false;
        }
        return this.authorizationService.checkUserPermission(request.user.id, permissionUrl);
    }
}
