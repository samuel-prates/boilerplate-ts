import "reflect-metadata";
import { HealthCheck } from '../../src/entrypoint';
import { StatusCodes } from "http-status-codes";
import { expect } from 'chai';
import { stub } from 'sinon';
import { CommandResponse } from "../../src/app/model";

describe('HealthCheckController tests', () => {
    const req: any = {} as any;
    let send: any;
    let res: any;
    let commandBus: any;
    let commandResponse: CommandResponse;

    beforeEach(() => {
        send = stub();
        res = {
            statusCode: StatusCodes.OK,
            send,
        } as any;
        commandBus = {
            execute: stub().callsFake(()=>{ return [commandResponse] })
        } as any;
    });

    it('HealthCheck UNAUTHORIZED', async () => {
        commandResponse = new CommandResponse(StatusCodes.UNAUTHORIZED, '');
        const healthCheck = new HealthCheck(commandBus);
        await healthCheck.check(req, res);

        expect(res.statusCode).to.be.eql(StatusCodes.UNAUTHORIZED);
        expect(send).to.be.calledOnce;
    });

    it('HealthCheck Ok', async () => {
        commandResponse = new CommandResponse(StatusCodes.OK, '');
        const healthCheck = new HealthCheck(commandBus);
        await healthCheck.check(req, res);

        expect(res.statusCode).to.be.eql(StatusCodes.OK);
        expect(send).to.be.calledOnce;
    });
});
