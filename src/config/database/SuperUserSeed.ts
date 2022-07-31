import { v4 as uuidV4 } from "uuid";

import createConnection from "./connect";

async function create(): Promise<void> {
  const connection = await createConnection("localhost");
  const user_id = uuidV4();
  const password = "7d35bf544ac09df9e6138670ac40abc0";
  const superUser_id = uuidV4();

  if (
    (await connection.query(`SELECT * FROM USERS WHERE role = 'superUser'`))
      .length > 0
  ) {
    console.log("SuperUser already exists");
    return;
  }
  await connection.query(
    `INSERT INTO USERS (id, email, password, role, created_at, updated_at)
    values('${user_id}', 'superuser@rarotube.com.br', '${password}', 'superUser', 'now()', 'now()' )`
  );

  if ((await connection.query(`SELECT * FROM SUPER_USER`)).length > 0) {
    console.log("SuperUser already exists");
    return;
  }
  await connection.query(
    `INSERT INTO SUPER_USER (id, name, user_id, created_at, updated_at)
    values('${superUser_id}', 'superUser', '${user_id}', 'now()', 'now()' )`
  );
  await connection.close();
}

create().then(() => console.log("Super User created"));
