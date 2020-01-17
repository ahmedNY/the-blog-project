import { CommandResponse } from '../lib/command-response';

export interface CommandInterface {
    execute(...optionalParams: any[]): Promise<CommandResponse> | CommandResponse;
}
