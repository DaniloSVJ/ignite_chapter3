import { ICreateRentalsDTOS } from "@modules/rentals/dtos/ICreateRentalsDTOS";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Repository } from "typeorm";
import { Rentals } from "../entities/Rentals";


class RentalRepository implements IRentalsRepository{
   
  

    private repository: Repository<Rentals>

    async findOpenRentalByCar(car_id: string): Promise<Rentals> {
        const openByCar = await this.repository.findOne({car_id,end_date:null})
        return openByCar
    }
    async findOpenRentalByUser(users_id: string): Promise<Rentals> {
        const openByUser = await this.repository.findOne(
            {user_id:users_id,end_date:null})

        return openByUser
    }
    async create({car_id,user_id,expected_return_date,id,end_date,total}: ICreateRentalsDTOS): Promise<Rentals> {
        const rental = this.repository.create({car_id,user_id,expected_return_date,id,end_date,total})
      

        await this.repository.save(rental)
        return rental
    }
    async findById(id: string): Promise<Rentals> {
        const rental = await this.repository.findOne(id)

        return rental

    }
    async findByUser(user_id: string): Promise<Rentals[]> {
        const rentals =  await this.repository.find({
            where:{user_id},
            relations:["car"]
        })

        return rentals
    }

}

export {RentalRepository}