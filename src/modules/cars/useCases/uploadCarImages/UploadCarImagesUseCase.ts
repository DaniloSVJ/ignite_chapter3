import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarImageRespository } from "@modules/cars/repositories/ICarImageRespository";
import { ICarRepository } from "@modules/cars/repositories/ICarRepositories";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest{
    car_id:string;
    image_name:string[]
}

@injectable()
class UploadCarImagesUseCase{
    constructor(
        @inject("CarImageRepository")
        private carImageRepository: ICarImageRespository

    ){}
   async execute({car_id,image_name}:IRequest): Promise<void>{
        image_name.map(async (image)=>{
            await this.carImageRepository.create(
                car_id,
                image
            )
        })
      
   }
}

export {UploadCarImagesUseCase}