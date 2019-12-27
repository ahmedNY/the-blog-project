import { Permission } from './permission.model';

export class Module {
    id: number;
    moduleName: string;
    permissions?: Permission[];
}
