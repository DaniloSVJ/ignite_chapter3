import { IUserRespository } from "../IUsersRespository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTOS"
import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/Users"


class UserRepository implements IUserRespository {

    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }
    
    async create({ id,name, avatar, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const user = await this.repository.create({
            id,
            name, 
            avatar, 
            email, 
            password, 
            driver_license
        })

        await this.repository.save(user)
    }
  

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email})

        return user
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({id})

        return user   
    }
}

export { UserRepository }