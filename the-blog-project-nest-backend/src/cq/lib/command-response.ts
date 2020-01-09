import { CommandResponseInterface } from '../interfaces/command-response.interface';

export class CommandResponse implements CommandResponseInterface {
    success: boolean;
    type: 'success' | 'error';
    message: string;
    code: string;
    status: 200 | 500;
    data: any;
    hint: 'error' | 'warning' | 'success' | 'info';

    static error(message: string, code: string, data: any = {}): CommandResponseInterface {
        return {
            success: false,
            type: 'error',
            message,
            code,
            status: 500,
            data,
            hint: 'error',
        };
    }
    static success(message: string, code: string, data: any = {}): CommandResponseInterface {
        return {
            success: true,
            type: 'success',
            message,
            code,
            status: 200,
            data,
            hint: 'success',
        };
    }
}
