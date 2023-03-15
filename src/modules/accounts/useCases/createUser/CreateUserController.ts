import { Request, Response } from "express"
import "reflect-metadata";
import { container } from "tsyringe"
import { CreateUserUseCase } from "./CreateUserUseCase"

class CreateUserController {

    
    async handle(request: Request, response: Response): Promise<Response> {
        const { name,email,password,driver_license } = request.body
        const createUseCase = await container.resolve(CreateUserUseCase)
        await createUseCase.execute({ name,email,password,driver_license })

        return response.status(201).send()


    }

}

export { CreateUserController }