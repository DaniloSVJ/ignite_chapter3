import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalsUseCases } from "./CreateRentalsUseCases";


class CreateRentalsControllers {

    async handle(request:Request,response:Response):Promise<Response>{
        const {car_id,expected_return_date} = request.body
        const { id} = request.user
        const user_id = id
        const createRentalUseCase = container.resolve(CreateRentalsUseCases)

        const rental = await createRentalUseCase.execute({
            car_id,
            user_id,
            expected_return_date
        })

        return response.status(201).json(rental)
    }
}

export {CreateRentalsControllers}