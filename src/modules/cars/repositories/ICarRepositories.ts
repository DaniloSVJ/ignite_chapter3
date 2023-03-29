import { ICreateCarsDTO } from "../dtos/ICreateCarsDTO";
import { Cars } from "../infra/typeorm/entities/Cars";

interface ICarRepository{
    create(data:ICreateCarsDTO):Promise<Cars>
    findByLicensaPlate(license_plate:string):Promise<Cars>
    findAvaliable(brand?:string,category_id?:string,name?:string):Promise<Cars[]>
    findById(id:string):Promise<Cars>
}

export {ICarRepository}