import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTOS";
import { User } from "@modules/accounts/infra/typeorm/entities/Users";
import { IUserRespository } from "../IUsersRespository";


class UsersRepositoryInMemory implements IUserRespository {
    
    users: User[] = []

    async create({ driver_license,name,password,email}: ICreateUserDTO): Promise<void> {
        const user = new User()

        Object.assign(user,{
            driver_license,name,password,email
        })

        this.users.push(user)

    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user)=>user.email===email)
        
    }
    async findById(id: string): Promise<User> {
        return this.users.find((user)=>user.id===id)
        
    }
  


}

export { UsersRepositoryInMemory }