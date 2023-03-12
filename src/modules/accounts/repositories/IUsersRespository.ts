import { ICreateUserDTO } from "../dtos/ICreateUserDTOS"
import { User } from "../entities/Users"

interface IUserRespository{
    create(data: ICreateUserDTO):Promise<void>
    findByEmail(email:string):Promise<User>
}

export {IUserRespository}