import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "44.199.200.211" : host,
      database:
        process.env.NODE_ENV === "test"
          ? "raro_tube_test"
          : defaultOptions.database,
    })
  ); 
};
