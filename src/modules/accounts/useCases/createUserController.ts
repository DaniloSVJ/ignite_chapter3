import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateUseCase } from "./createUseCase"

class CreateUserController {

    
    async handle(request: Request, response: Response): Promise<Response> {
        const { name,username,email,password,driver_license } = request.body

        const createUseCase = container.resolve(CreateUseCase)
        await createUseCase.execute({ name,username,email,password,driver_license })

        return response.status(201).send()

        
    }

}

export { CreateUserController }