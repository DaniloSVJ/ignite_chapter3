import { Rentals } from "@modules/rentals/infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";



@injectable()
class ListRentalsByUserUseCase{
    constructor(
        @inject("RentalRepository")
        private rentalsRepository: IRentalsRepository
    ){}
    async execute(user_id:string):Promise<Rentals[]>{
        const rentalsByUser = await this.rentalsRepository.findByUser(user_id)

        return rentalsByUser
    }

     
}

export  {ListRentalsByUserUseCase}