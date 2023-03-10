import {Request ,Response } from "express"
import {container} from "tsyringe"
import { CreateCategoryUseCases } from "./CreateCategoryUseCase"
class CreateCategoryController {
    
    handle(request:Request,response:Response):Response{
        const {name,description} = request.body

        const createCategoryUseCases = container.resolve(CreateCategoryUseCases)
        createCategoryUseCases.execute({name,description})
    
        return response.status(201).send()
    }

}

export {CreateCategoryController}