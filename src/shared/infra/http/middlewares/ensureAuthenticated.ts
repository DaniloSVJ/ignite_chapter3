import {NextFunction, Request, Response} from "express"

import {verify} from "jsonwebtoken"
import { AppError } from "../../../errors/AppError";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";
interface IPayload{
    sub: string
}

export async function ensureAuthenticated(request:Request,response:Response,next: NextFunction){
    const authHerder = request.headers.authorization;
    const usersTokensRepository = new UsersTokensRepository()
    if(!authHerder){
        throw new AppError("Token missing",401)
    }

    const [,token] = authHerder.split(" ")

    

    try{
        const {sub: user_id} = verify(
            token,
            auth.secret_refresh_token
            ) as IPayload
        const userRepository = new UserRepository()
        const user = await usersTokensRepository.findByUserIdAndRefreshToken(user_id,token)
        if(!user){
            throw new AppError("User does not exists!", 401)
        }

        //Aqui foi sobrescrito uma tipagem no @types
        request.user ={
            id: user_id
        }
        
        next()

    }catch{
        throw new AppError("Invalid token!",401)

    }
}