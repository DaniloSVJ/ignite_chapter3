import { ICreateCarsDTO } from "../dtos/ICreateCarsDTO";
import { CarImage } from "../infra/typeorm/entities/CarImage";


interface ICarImageRespository{
    create(car_id:string,image_name:string):Promise<CarImage>
    
}

export {ICarImageRespository}