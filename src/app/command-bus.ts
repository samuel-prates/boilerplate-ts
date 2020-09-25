import { injectable, multiInject } from "inversify";
import { COMMON_TYPES } from "../config/types.ts/common-types";
import { Command, CommandResponse } from "./model";
import { CommandHandler } from "./model/command-handler";

@injectable()
export class CommandBus {
    handlerList: CommandHandler[];

    constructor(
        @multiInject(COMMON_TYPES.CommandHandler)
        commandHandlerList: CommandHandler[]
    ){
        this.handlerList = commandHandlerList;
    }

    async execute(command: Command): Promise<CommandResponse[]> {
        const promises: Promise<CommandResponse>[] = [];
        let response: CommandResponse[] = [];

        this.handlerList.forEach((handler: CommandHandler) => {
            if(handler.shouldPerform(command)){
                promises.push(handler.execute(command));
            }
        })

        await Promise.all(promises)
        .then(result => response = result);

        return response;
    }
}
