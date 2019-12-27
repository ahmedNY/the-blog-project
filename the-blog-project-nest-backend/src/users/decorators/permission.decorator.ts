import { SetMetadata } from '@nestjs/common';

export const CheckPermission = (action: string, resource: string) => SetMetadata('permission', { action, resource });
