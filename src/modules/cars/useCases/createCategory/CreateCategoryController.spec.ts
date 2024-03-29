import "reflect-metadata"
import { app } from '@shared/infra/http/app'
import request from 'supertest'
import createConnection from "@shared/infra/typeorm"
import { Connection } from "typeorm"
import {hash} from "bcrypt"
import {v4 as uuidV4} from "uuid"
let connection: Connection
describe("Create Category Controller", ()=>{
    beforeAll(async()=>{
        connection = await createConnection()
        await connection.runMigrations()
        const id = uuidV4()
        const password= await hash('admin',5)
        await connection.query(`
        INSERT INTO USERS(id,name,email,password,"isAdmin",create_at,driver_license)
        VALUES ('${id}','admin','admin22@rentx22.com','${password}',true, 'now()','XXXXX')
        `)
    })
    afterAll(async()=>{
        await connection.dropDatabase()
        await connection.close()

    })
    it("should be able to create a new category ",async()=>{
        const responseToken = await request(app).post("/sessions")
        .send({
            email:"admin22@rentx22.com",
            password: "admin"	
        })
        const {token} = responseToken.body
        console.log('==============')
        console.log(token)
        console.log('==============')
        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest"
        })
        .set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(201)
    })
    // it("should not be able to create a new category with name exists",async()=>{
    //     const responseToken = await request(app).post("/sessions")
    //     .send({
    //         email:"admin@rentx22.com",
    //         password: "admin"	
    //     })
    //     const {token} = responseToken.body


    //     const response = await request(app).post("/categories").send({
    //         name: "Category Supertest",
    //         description: "Category Supertest"
    //     })
    //     .set({
    //         Authorization: `Bearer ${token}`
    //     })
    //     expect(response.status).toBe(400)
    // })
    
})