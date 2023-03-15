import { Request, Response } from "express";
import { container } from "tsyringe";
import { AutenticateUserUseCase } from "./AutenticateUserUseCase";


class AuthenticateUserController{

    async handle(request:Request,response:Response):Promise<Response>{
        const {email,password}= request.body

        const authenticateUseCase = container.resolve(AutenticateUserUseCase)

        const token = await authenticateUseCase.execute({password,email})

        return response.json(token)
    }

}


export {AuthenticateUserController}