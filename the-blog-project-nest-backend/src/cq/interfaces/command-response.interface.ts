export interface CommandResponseInterface {
    success: boolean;
    type: 'success' | 'error';

    message: string;
    code: string;

    status: 200 | 500;
    data: any;
    hint: 'error' | 'warning' | 'success' | 'info';
}
