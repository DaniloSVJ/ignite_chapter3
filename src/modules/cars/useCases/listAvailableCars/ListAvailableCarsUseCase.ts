import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarRepository } from "@modules/cars/repositories/ICarRepositories";
import { inject, injectable } from "tsyringe";

interface IRequest{
    brand?:string;
    category_id?:string;
    name?:string
}
@injectable()
class ListAvailableCarsUseCase{
    constructor(
    @inject("CarRepository")    
    private carRespository: ICarRepository){}

    async execute({brand,category_id,name}:IRequest):Promise<Cars[]>{
        const cars = await this.carRespository.findAvaliable(
            brand,category_id,name

        )

        return cars
    }
}
export {ListAvailableCarsUseCase}