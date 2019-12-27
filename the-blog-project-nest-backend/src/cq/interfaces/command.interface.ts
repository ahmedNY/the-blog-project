export interface CommandInterface {
    execute(args: any): Promise<any>;
}
