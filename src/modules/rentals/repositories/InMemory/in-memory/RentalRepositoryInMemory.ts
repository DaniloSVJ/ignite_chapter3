import { ICreateRentalsDTOS } from "@modules/rentals/dtos/ICreateRentalsDTOS";
import { Rentals } from "@modules/rentals/infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "../../IRentalsRepository";


class RentalRepositoryInMemory implements IRentalsRepository{

    rentals: Rentals[] = []
    async findOpenRentalByCar(car_id: string): Promise<Rentals> {
        return this.rentals.find(rental=>rental.car_id===car_id && !rental.end_date)
    }
    async findOpenRentalByUser(users_id: string): Promise<Rentals> {
        return this.rentals.find(rental=>rental.user_id===users_id && !rental.end_date)
    }
    async create(data: ICreateRentalsDTOS): Promise<Rentals> {
        const {car_id,expected_return_date,user_id} = data

        const rental = new Rentals()

        Object.assign(rental,{
            car_id,
            expected_return_date,
            user_id,
            start_date: new Date()
        })

        this.rentals.push(rental)

        return rental
    }

}

export {RentalRepositoryInMemory}