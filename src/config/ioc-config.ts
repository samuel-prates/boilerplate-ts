import { Container } from 'inversify';
import { CommandBus } from '../app/command-bus';
import { HealthCheckHandler } from '../app/handler/health-check-handler';
import { COMMON_TYPES } from './types.ts/common-types';

export default function createIocConfig(container: Container) {
    container.bind<CommandBus>(COMMON_TYPES.CommandBus).to(CommandBus);
    container.bind<HealthCheckHandler>(COMMON_TYPES.CommandHandler).to(HealthCheckHandler);

    return container;
}
