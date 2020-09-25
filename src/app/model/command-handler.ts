import { Command } from "./";
import { CommandResponse } from "./command-response";

export interface CommandHandler {
    execute(command: Command): Promise<CommandResponse>;
    shouldPerform(command: Command): boolean;
}
