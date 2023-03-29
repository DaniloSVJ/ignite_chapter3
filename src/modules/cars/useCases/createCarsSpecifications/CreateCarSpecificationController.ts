import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarsUseCase } from "../createCars/CreateCarsUseCase";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";


class CreateCarSpecificationController{
    async handle(request:Request,response:Response):Promise<Response>{
        const {id} = request.params
        const {specifications_id} = request.body

        const createCarSpecificationUseCase = await container.resolve(CreateCarSpecificationUseCase)
        await createCarSpecificationUseCase.execute({
            car_id:id,
            specifications_id
        })
    
        return response.status(201).send()
   
    }
}

export {CreateCarSpecificationController}