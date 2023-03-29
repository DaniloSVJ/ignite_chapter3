import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarRepository } from "@modules/cars/repositories/ICarRepositories";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpeficationRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
    car_id: string;
    specifications_id:string[];
}
@injectable()
class CreateCarSpecificationUseCase{
    constructor(
        @inject("CarRepository")
        private carsRepository: ICarRepository,
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationsRepository
        ){}

    async execute({car_id,specifications_id}:IRequest):Promise<Cars>{
        const carExists = await this.carsRepository.findById(car_id)

        if(!carExists){
            throw new AppError("Car does not exists!")
        }
        const specificationsExists = await this.specificationsRepository.findByIds(specifications_id)
        if(!specificationsExists){
            throw new AppError("Specifications does not exists!")
        }
        carExists.specifications = specificationsExists

        const cars = this.carsRepository.create(carExists)

        return cars
        

    }
}

export {CreateCarSpecificationUseCase}