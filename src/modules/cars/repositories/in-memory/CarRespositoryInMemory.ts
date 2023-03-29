import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarRepository } from "../ICarRepositories";

class CarRespositoryInMemory implements ICarRepository{
    cars: Cars[]=[]
    async create({name,license_plate,brand,category_id,daily_rate,description,fine_amount,id,specifications}: ICreateCarsDTO): Promise<Cars> {
        const car = new Cars()
        
        Object.assign(car,{
            name,license_plate,brand,category_id,daily_rate,description,fine_amount,id,specifications
        })

        this.cars.push(car)

        return car
    }
    async findByLicensaPlate(license_plate: string): Promise<Cars> {
        return this.cars.find(car=>car.license_plate===license_plate)
    }
    async findAvaliable(brand?:string,category_id?:string,name?:string): Promise<Cars[]> {
        const all =  this.cars.filter((cars)=>{
            if(
                cars.available===true ||
                ((brand && cars.brand===brand) ||
                (category_id && cars.category_id===category_id) ||
                (name && cars.name===name))
                
            ){
                return cars
            }
            return null
        })
   

        return all
    }
    async findById(id: string): Promise<Cars> {
        return this.cars.find(car=>car.id===id)
        
        
    }

}
export {CarRespositoryInMemory}