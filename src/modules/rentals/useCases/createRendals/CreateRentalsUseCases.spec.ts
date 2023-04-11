import dayjs from "dayjs";
import { AppError } from "@shared/errors/AppError";
import { CateogoriesRepositoriesInMemory } from "@modules/cars/repositories/in-memory/CateogoriesRepositoriesInMemory";

import { CreateRentalsUseCases } from "./CreateRentalsUseCases";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/InMemory/in-memory/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarRespositoryInMemory } from "@modules/cars/repositories/in-memory/CarRespositoryInMemory";

let createRendalsUseCases: CreateRentalsUseCases
let rentalRepositoryInMemory: RentalRepositoryInMemory
let dayJsProvider: DayjsDateProvider
let carRespositoryInMemory: CarRespositoryInMemory

describe(
    "Criar Rendels",()=>{
        const dayAdd24Hours = dayjs().add(1,"day").toDate()
        beforeEach(()=>{
            carRespositoryInMemory = new CarRespositoryInMemory()
            rentalRepositoryInMemory = new RentalRepositoryInMemory()
            dayJsProvider = new DayjsDateProvider()
            createRendalsUseCases = new CreateRentalsUseCases(rentalRepositoryInMemory,dayJsProvider,carRespositoryInMemory)

        })

        it("should be able to create a new rental",async ()=>{
          const car = await carRespositoryInMemory.create({
            name:"Test",
            description: "Car test",
            category_id: "1234",
            brand:"brand",
            daily_rate:100,
            fine_amount:40,
            license_plate:"121"
          })  
            
          const rental=  await createRendalsUseCases.execute({
                car_id:car.id,
                user_id: "1234",
                expected_return_date: dayAdd24Hours
            })
            console.log(rental)
            expect(rental).toHaveProperty("id")
            expect(rental).toHaveProperty("start_date")
        })

        it("should be able to create a new rental if there is another open to same user",async ()=>{
            await rentalRepositoryInMemory.create({
                car_id:"1234",
                expected_return_date: dayAdd24Hours,
                user_id: "1234"
              })  
            
           
            await expect(createRendalsUseCases.execute({
                      car_id:"1234",
                      user_id: "12345",
                      expected_return_date: dayAdd24Hours
                  })
            ).rejects.toEqual(new AppError("Car is unavaliable!"))
           
  
          })
          it("should be able to create a new rental if there is another open to same car",async ()=>{
            await rentalRepositoryInMemory.create({
                car_id:"1234",
                expected_return_date: dayAdd24Hours,
                user_id: "1234"
              })  
            await expect(createRendalsUseCases.execute({
                      car_id:"1234",
                      user_id: "12345",
                      expected_return_date: dayAdd24Hours
                  })
            ).rejects.toEqual(new AppError("Car is unavaliable!"))
           
  
          })

          it("should be able to create a new rental with invalid return time ",async ()=>{
            await expect(
                createRendalsUseCases.execute({
                    car_id:"123",
                    user_id: "12345",
                    expected_return_date: dayjs().toDate()
                })
                
            ).rejects.toEqual(new AppError("Invalid return time!"))
           
  
          })
  
    }
)

