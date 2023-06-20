import createConnection from '../index';
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";



async function create() {
  const connection = await createConnection();
  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(`
    INSERT INTO users(id, name, email, password, is_admin, created_at, driver_license)
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXX-XXXX')
    `);

  await connection.close();
}

create().then(() => console.log("User admin created!"));
