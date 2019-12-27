import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/users/services/authorization.service';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly authorizationService: AuthorizationService,
    ) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.authorizationService.hasRole(request.user, 'Admin');
    }
}
