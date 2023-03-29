import dayjs from "dayjs";
import { AppError } from "@shared/errors/AppError";
import { CateogoriesRepositoriesInMemory } from "@modules/cars/repositories/in-memory/CateogoriesRepositoriesInMemory";

import { CreateRentalsUseCases } from "./CreateRentalsUseCases";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/InMemory/in-memory/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementetions/DayjsDateProvider";

let createRendalsUseCases: CreateRentalsUseCases
let rentalRepositoryInMemory: RentalRepositoryInMemory
let dayJsProvider: DayjsDateProvider
describe(
    "Criar Rendels",()=>{
        const dayAdd24Hours = dayjs().add(1,"day").toDate()
        beforeEach(()=>{

            rentalRepositoryInMemory = new RentalRepositoryInMemory()
            dayJsProvider = new DayjsDateProvider()
            createRendalsUseCases = new CreateRentalsUseCases(rentalRepositoryInMemory,dayJsProvider)

        })

        it("should be able to create a new rental",async ()=>{
            
            
          const rental=  await createRendalsUseCases.execute({
                car_id:"1234",
                user_id: "12345",
                expected_return_date: dayAdd24Hours
            })
            console.log(rental)
            expect(rental).toHaveProperty("id")
            expect(rental).toHaveProperty("start_date")
        })

        it("should be able to create a new rental if there is another open to same user",async ()=>{
            expect(async()=>{
                await createRendalsUseCases.execute({
                    car_id:"1234",
                    user_id: "12345",
                    expected_return_date: dayAdd24Hours
                })
                  await createRendalsUseCases.execute({
                      car_id:"1234",
                      user_id: "12345",
                      expected_return_date: dayAdd24Hours
                  })
            }).rejects.toBeInstanceOf(AppError)
           
  
          })
          it("should be able to create a new rental if there is another open to same car",async ()=>{
            expect(async()=>{
                await createRendalsUseCases.execute({
                    car_id:"123",
                    user_id: "12345",
                    expected_return_date: dayAdd24Hours
                })
                  await createRendalsUseCases.execute({
                      car_id:"1234",
                      user_id: "12345",
                      expected_return_date: dayAdd24Hours
                  })
            }).rejects.toBeInstanceOf(AppError)
           
  
          })

          it("should be able to create a new rental with invalid return time ",async ()=>{
            expect(async()=>{
                await createRendalsUseCases.execute({
                    car_id:"123",
                    user_id: "12345",
                    expected_return_date: dayjs().toDate()
                })
                
            }).rejects.toBeInstanceOf(AppError)
           
  
          })
  
    }
)

