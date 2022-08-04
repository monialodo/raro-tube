import * as dotenv from "dotenv";

import createApp from "./config/app";
import createDatabaseConnection from "./config/database/connect";

import "reflect-metadata";

import createDependencyInjector from "./config/dependencies/createInjector";
import createServer from "./infra/server/server";

dotenv.config(); 

export const start = async () => {
  try {
    await createDatabaseConnection();
    const app = createApp();
    createDependencyInjector();
    createServer(app);
  } catch (error) { 
    console.error("Fatal error: ", error);
  }
};

start();
