import  createApp from './config/app';
import createDatabaseConnection from './config/database/connect';
import createServer from '../src/infra/server/server';
import 'reflect-metadata'
import * as dotenv from 'dotenv';

dotenv.config();
 

export const start = async () => {
    try {
      // await createDatabaseConnection();
      const app = createApp();
  
      createServer(app);
    } catch (error) {
      console.error('Fatal error: ', error);
    }
  };

  start();

 