import { ICreateUserDTO } from "../../dtos/ICreateUserDTOS";
import { User } from "../../entities/Users";
import { UserRepository } from "../implementations/UserRepository";
import { IUserRespository } from "../IUsersRespository";


class UsersRepositoryInMemory implements IUserRespository {
  
    users: User[] = []

    async create({ 
        
        email, 
        driver_license, 
        name, 
        password 
    }: ICreateUserDTO): Promise<void> {
        
        const user = new User()

        Object.assign(user, {
            email, 
            driver_license, 
            name, 
            password
        })

        this.users.push(user)
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email)


    }


    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id)
    }

}

export { UsersRepositoryInMemory }