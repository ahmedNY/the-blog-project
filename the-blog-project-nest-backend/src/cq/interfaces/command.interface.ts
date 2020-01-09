import { CommandResponse } from '../lib/command-response';

export interface CommandInterface {
    execute(args: any): Promise<CommandResponse> | CommandResponse;
}
