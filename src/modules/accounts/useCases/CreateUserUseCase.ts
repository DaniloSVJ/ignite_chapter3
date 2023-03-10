import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTOS";
import { UserRepository } from "../repositories/implementations/UserRepository";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: UserRepository
    ) {}


    async execute({ name, username, email, password, driver_license }: ICreateUserDTO) {
        await this.userRepository.create({
            name,
            username,
            email,
            password,
            driver_license
        })
        
    }
    
}

export { CreateUserUseCase }