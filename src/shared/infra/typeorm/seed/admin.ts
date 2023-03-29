import createConnection from "../index"
import{v4 as uuidV4} from "uuid"
import {hash} from 'bcrypt'
async function create() {
    const connection =  await createConnection("localhost")

    const id = uuidV4()
    const password= await hash('admin',5)
    await connection.query(`
    INSERT INTO USERS(id,name,email,password,"isAdmin",create_at,driver_license)
    VALUES ('${id}','admin','admin@rentx22.com','${password}',true, 'now()','XXXXX')
    `)

    await connection.close

}
create().then(()=>console.log("Teste admin"))

