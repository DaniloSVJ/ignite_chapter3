import {AutenticateUserUseCase} from "./AutenticateUserUseCase"
import {UsersRepositoryInMemory} from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTOS"
import { AppError } from "@shared/errors/AppError"

let usersRepositoryInMemory:UsersRepositoryInMemory
let autenticateUserUseCase:AutenticateUserUseCase
let createUserUseCase:CreateUserUseCase

describe("Authenticate User",()=>{

    beforeEach(()=>{
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)    
        autenticateUserUseCase = new AutenticateUserUseCase(usersRepositoryInMemory)
        
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
    it("should not be able to authenticate an nonexistent user", async ()=>{
        expect(async ()=>{
            await autenticateUserUseCase.execute(
                {
                    email: 'falsoemail@gmail.com',
                    password: "112345"
                }
            )
        }).rejects.toBeInstanceOf(AppError)
    })
    it("should not be able to authenticate with incorrect password",async ()=>{
        expect(async ()=>{
            const user:  ICreateUserDTO = {
                driver_license:"008123",
                email:"user@test.com",
                name: "User test",
                password: "123"
            }
    
            await createUserUseCase.execute(user)

            await autenticateUserUseCase.execute(
                {
                    email: user.email,
                    password: "456"
                }
            )
        }).rejects.toBeInstanceOf(AppError)
    })
})