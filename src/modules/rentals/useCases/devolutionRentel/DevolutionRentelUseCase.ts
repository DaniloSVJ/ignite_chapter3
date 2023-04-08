import { ICarRepository } from "@modules/cars/repositories/ICarRepositories";
import { Rentals } from "@modules/rentals/infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest{
    id: string;
    user_id:string
}
@injectable()
class DevolutionRentelUseCase{
   constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalsRepository,
    @inject("CarRepository")
    private carsRepository: ICarRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
    ){} 
   async execute({id,user_id}:IRequest):Promise<Rentals>{
     const rental = await this.rentalRepository.findById(id)
     const minimo_delay = 1
     const car = await this.carsRepository.findById(rental.car_id)
     if(!rental){
        throw new AppError("Rental does not exists!")
     }

     const dateNow =  this.dateProvider.dateNow()
     let delay = this.dateProvider.compareInDays(
        rental.start_date,
        this.dateProvider.dateNow()
     )
     if(delay<=0){
        delay=minimo_delay
     }
     const delay_multe = this.dateProvider.compareInDays(
        dateNow,
        rental.expected_return_date
     )
     let total = 0   
     if(delay_multe>0){
        const calcule_fine =  delay*car.fine_amount;
        total = calcule_fine
     }
     total+= delay*car.daily_rate

     rental.end_date = this.dateProvider.dateNow()
     rental.total =total

     await this.rentalRepository.create(rental)
     await this.carsRepository.updateAvailable(car.id,true)

     return rental
   }
}

export {DevolutionRentelUseCase}