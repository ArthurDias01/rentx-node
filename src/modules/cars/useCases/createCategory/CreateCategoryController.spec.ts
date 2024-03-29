import { Connection } from 'typeorm';
import { app } from '../../../../app';
import request from 'supertest';
import createConnection from '@shared/infra/typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from "uuid";

let connection: Connection;

describe("Create Category Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(`
      INSERT INTO users(id, name, email, password, is_admin, created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXX-XXXX')
      `);

  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });

    const { refresh_token } = responseToken.body
    // console.log('responseToken', responseToken.body)

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest"
      }).set({
        Authorization: `Bearer ${refresh_token}`
      })

    expect(response.status).toBe(201);
  });

  it("should not be able to create a duplicated category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });

    const { refresh_token } = responseToken.body
    // console.log('responseToken', responseToken.body)

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest"
      }).set({
        Authorization: `Bearer ${refresh_token}`
      })

    expect(response.status).toBe(400);
  });

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });

    const { refresh_token } = responseToken.body
    // console.log('responseToken', responseToken.body)

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest"
      }).set({
        Authorization: `Bearer ${refresh_token}`
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");
  });


});
