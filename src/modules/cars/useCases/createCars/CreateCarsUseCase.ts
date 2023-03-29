import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarRepository } from "@modules/cars/repositories/ICarRepositories";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest{
    name: string,
    description: string,
    daily_rate:number,
    
    license_plate: string,
    fine_amount:number,
    brand: string,
    category_id: string,
}

@injectable()
class CreateCarsUseCase{
    constructor(
        @inject("CarRepository")
        private carRepository: ICarRepository

    ){}
   async execute({name,
    description,
    daily_rate,
    
    license_plate,
    fine_amount,
    brand,
    category_id}:IRequest): Promise<Cars>{

        const carsAlreadyExists = await this.carRepository.findByLicensaPlate(
            license_plate
        )

        if(carsAlreadyExists){
            throw new AppError("Car already exists")
        }
        // try {
            
        // } catch (error) {
            
        // }
        const car = this.carRepository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        })

        return car
    }
}

export {CreateCarsUseCase}