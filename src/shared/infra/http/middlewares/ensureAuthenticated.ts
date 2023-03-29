import {NextFunction, Request, Response} from "express"

import {verify} from "jsonwebtoken"
import { AppError } from "../../../errors/AppError";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";
interface IPayload{
    sub: string
}

export async function ensureAuthenticated(request:Request,response:Response,next: NextFunction){
    const authHerder = request.headers.authorization;

    if(!authHerder){
        throw new AppError("Token missing",401)
    }

    const [,token] = authHerder.split(" ")

    

    try{
        const {sub: user_id} = verify(token,"e434b149e2f3c418268e23d778777dfc") as IPayload
        const userRepository = new UserRepository()
        const user = await userRepository.findById(user_id)
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