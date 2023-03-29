import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTOS";
import {IUserRespository} from "@modules/accounts/repositories/IUsersRespository"
import {hash} from 'bcrypt'
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRespository
    ) {}


    async execute({ name, email, password, driver_license }: ICreateUserDTO) {
        
        const passwordHash= await hash(password,8)
        const isuseralreadyExist= await this.userRepository.findByEmail(email)                                                                                                                                                                                                                                                                        

        if(isuseralreadyExist){
            throw new AppError("User already exists")
        }


        this.userRepository.create({
            name,
            email,
            password:passwordHash,
            driver_license
        })
        
    }
    
}

export { CreateUserUseCase }