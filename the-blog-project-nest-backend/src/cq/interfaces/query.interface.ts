export interface QueryInterface {
    execute(...optionalParams: any[]): Promise<any>;
}
