import { ICreateUserDTO } from "../dtos/ICreateUserDTOS"

interface IUserRespository{
    create(data: ICreateUserDTO):Promise<void>
}

export {IUserRespository}