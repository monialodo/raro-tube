import { v4 as uuidV4 } from "uuid";

import createConnection from "./connect";

async function create(): Promise<void> {
  const connection = await createConnection("localhost");
  const root_id = uuidV4();
  const password = "root";

  await connection.query(
    `INSERT INTO USERS (id, name, email, password, role, created_at, updated_at)
    values('${root_id}', 'Root',  'root', '${password}', 'root', 'now()', 'now()')`

  );
  await connection.close();
}

create().then(() => console.log("Root user created"));
