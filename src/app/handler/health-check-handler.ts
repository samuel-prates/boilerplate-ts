import { StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';
import { HealthCheckCommand } from '../command';
import { Command, CommandHandler, CommandResponse } from '../model';

@injectable()
export class HealthCheckHandler implements CommandHandler {
    async execute(command: Command): Promise<CommandResponse> {
        if (command.name === HealthCheckCommand.name) {
            return new CommandResponse(StatusCodes.OK, 'ok');
        }
    }

    shouldPerform(command: Command): boolean {
        return command.name === HealthCheckCommand.name;
    }
}
