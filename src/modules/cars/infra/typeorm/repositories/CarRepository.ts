// import {  ICarRepository} from "../../../repositories/ICarRepositories";

import {getRepository, Repository} from "typeorm"
import { ICarRepository } from "@modules/cars/repositories/ICarRepositories"
import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO"
import { Cars } from "../entities/Cars"

//singleton
class CarRepository 
   
implements ICarRepository {
    
    private repository: Repository<Cars>
    

   constructor(){
        this.repository = getRepository(Cars)
    }
    findById(id: string): Promise<Cars> {
        return this.repository.findOne(id)
    }
    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        specifications,
        id
    }: ICreateCarsDTO): Promise<Cars> {


        const car =  this.repository.create(
            {
                brand,
                category_id,
                daily_rate,
                description,
                fine_amount,
                license_plate,
                name,
                specifications,
                id
            }
            )
            
            await  this.repository.save(car)
            
            return car
        }
    async findByLicensaPlate(license_plate: string): Promise<Cars> {
        const car = this.repository.findOne({
            license_plate
        })
        
        return car
    }
    
    async findAvaliable(brand?: string, category_id?: string, name?: string): Promise<Cars[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("c")
            .where("available = :available",{available:true})

        if(name){
            carsQuery.andWhere("c.name = :name",{name})
        }   

        if(brand){
            carsQuery.andWhere("c.brand = :brand",{brand})
        }   

        if(category_id){
            carsQuery.andWhere("c.category_id = :category_id",{category_id})
        }   
        const cars = await carsQuery.getMany()
        
        return cars
   

    }
}
    

export {CarRepository}