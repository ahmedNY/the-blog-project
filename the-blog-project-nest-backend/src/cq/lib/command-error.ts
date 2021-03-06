import { CommandResponseInterface } from '../interfaces/command-response.interface';
import { CommandResponse } from './command-response';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CommandError extends HttpException {
    constructor(readonly message: string, readonly code: string, readonly data: any = {}) {
        super(CommandResponse.error(message, code, data), HttpStatus.INTERNAL_SERVER_ERROR);
        this.name = 'CommandError';
    }
    getHttpResponse(): CommandResponseInterface {
        return CommandResponse.error(this.message, this.code, this.data);
    }
}
