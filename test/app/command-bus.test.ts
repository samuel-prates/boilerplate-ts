import "reflect-metadata";
import { expect, spy } from 'chai';
import { stub } from 'sinon';
import { Command, CommandHandler } from "../../src/app/model";
import { CommandBus } from "../../src/app";

describe('CommandBus tests', () => {
    const command: Command = new Command();
    let execute = stub();
    let firstCommandHandler: CommandHandler;
    let secondCommandHandler: CommandHandler;
    let commandBus: CommandBus;
    let firstShouldPerformResponse: boolean;
    let secondShouldPerformResponse: boolean;

    beforeEach(() => {
        execute = stub();
        firstCommandHandler = {
            execute,
            shouldPerform: (command: any) => firstShouldPerformResponse,
        } as any;
        secondCommandHandler = {
            execute,
            shouldPerform: (command: any) => secondShouldPerformResponse,
        } as any;
        commandBus = new CommandBus([firstCommandHandler, secondCommandHandler]);
    })

    it('execute return with one response', async () => {
        firstShouldPerformResponse = true;
        secondShouldPerformResponse = false;
        const response = await commandBus.execute(command);
        expect(response.length).to.be.eq(1);
        expect(execute).to.be.calledOnceWith(command);
    })

    it('execute return with two response', async () => {
        firstShouldPerformResponse = true;
        secondShouldPerformResponse = true;
        const response = await commandBus.execute(command);
        expect(response.length).to.be.eq(2);
        expect(execute).to.be.calledTwice;
    })

    it('execute should throw error', async () => {
        firstShouldPerformResponse = true;
        const exception = new Error('Message');
        spy.on(firstCommandHandler, 'execute', () => { throw exception; })
        expect(commandBus.execute(command)).to.be.rejectedWith(exception);
    })
});