import { CarRespositoryInMemory } from '@modules/cars/repositories/in-memory/CarRespositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import {CreateCarsUseCase} from './CreateCarsUseCase'


let createCarsUseCase:CreateCarsUseCase
let carRespositoryInMemory: CarRespositoryInMemory

describe('Create Cars',()=>{
    beforeEach(()=>{
        carRespositoryInMemory = new CarRespositoryInMemory()
        createCarsUseCase = new CreateCarsUseCase(carRespositoryInMemory)
    })

    it("should be able to create a new car",async ()=>{
        const car = await createCarsUseCase.execute({
            name:"Name car",
            description:"Description of cars",
            daily_rate:100,
            license_plate:"ABC-1234",
            fine_amount:60,
            brand:"Fiaat",
            category_id:"category"
        })

        expect(car).toHaveProperty("id")
    })

    it("should be able to create a car with exists  license plate",async ()=>{
       
       expect(async()=>{
        await createCarsUseCase.execute({
            name:"Name car",
            description:"Description of cars",
            daily_rate:100,
          
            license_plate:"ABC-1234",
            fine_amount:60,
            brand:"Fiaat",
            category_id:"category"
        })
        await createCarsUseCase.execute({
            name:"Name car2",
            description:"Description of cars",
            daily_rate:100,
          
            license_plate:"ABC-1234",
            fine_amount:60,
            brand:"Fiaat",
            category_id:"category"
        })

       }).rejects.toBeInstanceOf(AppError)
        
    })

    it("should be able to create a car with availability true by default",async ()=>{
        const car = await createCarsUseCase.execute({
            name:"Name car",
            description:"Description of cars",
            daily_rate:100,
            license_plate:"ABCD-1234",
            fine_amount:60,
            brand:"Fiaat",
            category_id:"category"
        })

        expect(car.available).toBe(true)
     })
    
})