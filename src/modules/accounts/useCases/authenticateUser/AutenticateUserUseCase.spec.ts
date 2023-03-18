import {AutenticateUserUseCase} from "./AutenticateUserUseCase"
import {UsersRepositoryInMemory} from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTOS"

let usersRepositoryInMemory:UsersRepositoryInMemory
let autenticateUserUseCase:AutenticateUserUseCase
let createUserUseCase:CreateUserUseCase

describe("Authenticate User",()=>{

    beforeEach(()=>{
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        autenticateUserUseCase = new AutenticateUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)    
    })

    it("should be able to authenticate an user", async ()=>{
        const user:  ICreateUserDTO = {
            driver_license:"008123",
            email:"user@test.com",
            name: "User test",
            password: "123"
        }

        await createUserUseCase.execute(user)

        const result = await autenticateUserUseCase.execute(
            {
                email: user.email,
                password: user.password
            }
        )
        
        expect(result).toHaveProperty("token")

    })
})