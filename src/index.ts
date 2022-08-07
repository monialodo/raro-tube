import * as dotenv from "dotenv";
import "reflect-metadata";

import createServer from "./infra/server/server";
import createApp from "./config/app";
import createDatabaseConnection from "./config/database/connect";
import createDependencyInjector from "./config/dependencies/createInjector";


 

dotenv.config(); 

export const start = async () => {
  try {
    await createDatabaseConnection();
    const app = createApp();
    createDependencyInjector();
    createServer(app);
 ;
  } catch (error) { 
    console.error("Fatal error: ", error);
  }
};


start();
