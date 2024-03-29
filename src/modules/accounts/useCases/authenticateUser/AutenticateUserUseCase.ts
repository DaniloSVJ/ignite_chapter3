import "reflect-metadata"
import { injectable ,inject} from "tsyringe";
import { IUserRespository } from "@modules/accounts/repositories/IUsersRespository";
import {sign} from "jsonwebtoken"
import {compare} from "bcrypt"
import { AppError } from "@shared/errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";


interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user:{
        name: string,
        email: string

    },
    token: string;
    refresh_token: string

}
@injectable()
class AutenticateUserUseCase{
    constructor(
        @inject("UserRepository")
        private userRespository: IUserRespository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    
    ){}

    async execute({email,password}:IRequest):Promise<IResponse>{
        const user = await this.userRespository.findByEmail(email)
        const {expires_token,secret_refresh_token,secret_token,expires_in_refresh_token,expires_refresh_token_days} = auth
        if(!user){
            throw new AppError("Email or password incorrect!",)
        }


        const passwordMath = await compare(password, user.password)

        if(!passwordMath){
            throw new AppError("Email or password incorrect!")
        }

        const token = sign({},secret_token,{
            subject: user.id,
            expiresIn: expires_token
        })
        const refresh_token = sign({email},secret_refresh_token,{
            subject:user.id,
            expiresIn:expires_in_refresh_token
        })
        const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)
        await this.usersTokensRepository.create({
            user_id:user.id,
           
            refresh_token,
            expires_date:refresh_token_expires_date,
        })

        const tokenReturn: IResponse ={
            token,
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token
        }
        return tokenReturn
    }
}

export {AutenticateUserUseCase}