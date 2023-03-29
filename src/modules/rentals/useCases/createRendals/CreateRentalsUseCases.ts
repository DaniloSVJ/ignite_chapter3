import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { Rentals } from "@modules/rentals/infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

dayjs.extend(utc)

interface IRequest{
    user_id:string;
    car_id:string;
    expected_return_date: Date;
}
@injectable()
class CreateRentalsUseCases{
    constructor(
        @inject("RentalRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ){}
    async execute({
        user_id,
        car_id,
        expected_return_date
    }:IRequest):Promise<Rentals>{
        const carUnavaliable = await this.rentalsRepository.findOpenRentalByCar(car_id)
        const minimoHour = 24
        if(carUnavaliable){
            throw new AppError("Car is unavaliable")
        }
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

        if(rentalOpenToUser){
            throw new AppError("There's a rental in progress for users")
        }

        const datenow =  this.dateProvider.dateNow()
            
        const compare = this.dateProvider.compareInHours(
            datenow,
            expected_return_date
        )
        
        if(compare< minimoHour){
            throw new AppError("Invalid return time")
        }

        const rentals = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        })
        console.log(compare)
        return rentals
    }
}

export {
    CreateRentalsUseCases
}