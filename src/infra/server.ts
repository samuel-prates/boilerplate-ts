import "reflect-metadata";
import express from 'express';
import { InversifyExpressServer } from "inversify-express-utils";
import createIocConfig from '../config/ioc-config';
import { Container } from 'inversify';
import '../entrypoint';

export async function startHttp() {
  try {
    const app = express();
    const port = 80 || process.env.PORT;
    const container = new Container();
    const server =  new InversifyExpressServer(createIocConfig(container), null, { rootPath: "/" }, app);
    const appConfigured = server.build();

    appConfigured.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log(`server started at http://localhost:${port}`);
    });
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(`Impossible to load configuration (${err})`);
  }
}
