import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject } from 'inversify';
import { COMMON_TYPES } from '../config/types.ts/common-types';
import { CommandBus } from '../app/command-bus';
import { HealthCheckCommand } from '../app/command';

@controller('/health-check')
export class HealthCheck {
    constructor(@inject(COMMON_TYPES.CommandBus) private _bus: CommandBus) { }

    @httpGet('/')
    public async check(req: Request, res: Response) {
        const command: HealthCheckCommand = new HealthCheckCommand();
        const hCResponse = await this._bus.execute(command);
        const sendList: any[] = [];
        res.statusCode = StatusCodes.OK;

        hCResponse.forEach(response => {
            sendList.push(response.body);
            if (response.status !== StatusCodes.OK) {
                res.statusCode = response.status;
                res.send(response.body);
            }
        });

        if (res.statusCode === StatusCodes.OK) {
            res.send(sendList);
        }
    }
}
