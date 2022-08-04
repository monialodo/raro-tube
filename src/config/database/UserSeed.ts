import { v4 as uuidV4 } from "uuid";

import createConnection from "./connect";

async function create(): Promise<void> {
  const connection = await createConnection("localhost");
  const admin_id = uuidV4();
  const teacher_id = uuidV4();
  const student_id = uuidV4();
  const password = "mysecret";

  await connection.query(
    `INSERT INTO USERS (id, name, email, password, role, created_at, updated_at)
    values('${admin_id}', 'Admin',  'admin@rarotube.com.br', '${password}', 'admin', 'now()', 'now()')`

  );
  await connection.query(

    `INSERT INTO USERS (id, name, email, password, role, created_at, updated_at)
    values('${teacher_id}', 'Teacher',  'teacher@rarotube.com.br', '${password}', 'teacher', 'now()', 'now()')`

  )

  await connection.query(

    `INSERT INTO USERS (id, name, email, password, role, created_at, updated_at)
    values('${student_id}', 'Student',  'student@rarotube.com.br', '${password}', 'student', 'now()', 'now()')`

  )

  await connection.close();
}

create().then(() => console.log("User created"));
