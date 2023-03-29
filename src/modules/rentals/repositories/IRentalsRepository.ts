import { ICreateRentalsDTOS } from "../dtos/ICreateRentalsDTOS"
import { Rentals } from "../infra/typeorm/entities/Rentals"

interface IRentalsRepository  {
    findOpenRentalByCar(car_id:string):Promise<Rentals>
    findOpenRentalByUser(users_id:string):Promise<Rentals>
    create(data:ICreateRentalsDTOS):Promise<Rentals>
}

export{IRentalsRepository}