import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTOS"
import { User } from "@modules/accounts/infra/typeorm/entities/Users"

interface IUserRespository{
    create(data: ICreateUserDTO):Promise<void>
    findByEmail(email:string):Promise<User>
    findById(id:string):Promise<User>
    
}

export {IUserRespository}