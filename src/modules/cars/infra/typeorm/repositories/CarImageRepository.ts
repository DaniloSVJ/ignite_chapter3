// import {  ICarRepository} from "../../../repositories/ICarRepositories";

import {getRepository, Repository} from "typeorm"
import { ICarRepository } from "@modules/cars/repositories/ICarRepositories"
import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO"
import { Cars } from "../entities/Cars"
import { ICarImageRespository } from "@modules/cars/repositories/ICarImageRespository"
import { CarImage } from "../entities/CarImage"

//singleton
class CarImageRepository 
   
implements ICarImageRespository {
    
    private repository: Repository<CarImage>
    

   constructor(){
        this.repository = getRepository(CarImage)
    }
   
    async create(car_id,image_name ): Promise<CarImage> {


        const carImage =  this.repository.create(
            {
                car_id,image_name
            }
            )
            
            await  this.repository.save(carImage)
            
            return carImage
        }
   
}
    

export {CarImageRepository}