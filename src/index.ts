import  createApp from './config/app';
import createDatabaseConnection from './config/database/connect';
import createServer from '../src/infra/server/server';
import 'reflect-metadata'
import * as dotenv from 'dotenv';
import createDependencyInjector from './config/dependencies/createInjector';

dotenv.config();
 

export const start = async () => {
    try {
      await createDatabaseConnection();
      const app = createApp();
      createDependencyInjector();
      createServer(app);
    } catch (error) {
      console.error('Fatal error: ', error);
    }
  };

  start();

 