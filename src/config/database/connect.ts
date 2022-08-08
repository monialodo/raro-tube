import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "localhost"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "database" : host,
      database:
        process.env.NODE_ENV === "test"
          ? "raro_tube_test"
          : defaultOptions.database,
    })
  );
};
