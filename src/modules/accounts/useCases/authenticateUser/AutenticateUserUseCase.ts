import "reflect-metadata"
import { injectable ,inject} from "tsyringe";
import { IUserRespository } from "@modules/accounts/repositories/IUsersRespository";
import {sign} from "jsonwebtoken"
import {compare} from "bcrypt"
import { AppError } from "@shared/errors/AppError";


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

}
@injectable()
class AutenticateUserUseCase{
    constructor(
        @inject("UserRepository")
        private userRespository: IUserRespository
    ){}

    async execute({email,password}:IRequest):Promise<IResponse>{
        const user = await this.userRespository.findByEmail(email)

        if(!user){
            throw new AppError("Email or password incorrect!",)
        }


        const passwordMath = await compare(password, user.password)

        if(!passwordMath){
            throw new AppError("Email or password incorrect!")
        }

        const token = sign({},"e434b149e2f3c418268e23d778777dfc",{
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenReturn: IResponse ={
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }
        return tokenReturn
    }
}

export {AutenticateUserUseCase}