import {Request ,Response } from "express"
import { ListCategoriesUseCase } from "./ListCategoryUseCase"

import {container} from "tsyringe" 

class ListCategoryController {
    
    
    handle(request:Request,response:Response):Response{
        const listCategoryUseCases = container.resolve(ListCategoriesUseCase)  
        const all = listCategoryUseCases.execute()
    
        return response.json(all)
    }

}

export {ListCategoryController}