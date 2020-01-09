import { SetMetadata } from '@nestjs/common';

export const CheckPermission = (url: string) => SetMetadata('permission', url);
