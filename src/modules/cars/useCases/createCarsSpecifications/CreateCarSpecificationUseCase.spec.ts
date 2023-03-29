import { CarRespositoryInMemory } from "@modules/cars/repositories/in-memory/CarRespositoryInMemory"
import { SpecificationRepositoriesInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoriesInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carRespositoryInMemory: CarRespositoryInMemory
let specificationsRepositoryInMemory: SpecificationRepositoriesInMemory
describe("Create Car Specification", () => {

    beforeEach(() => {
        specificationsRepositoryInMemory = new SpecificationRepositoriesInMemory()
        carRespositoryInMemory = new CarRespositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carRespositoryInMemory,specificationsRepositoryInMemory)
        
    })
    it("Should not be able to add a new specification to a now-exists car", async () => {

        expect(async () => {
            const car_id = "1234567"
            const specifications_id = ['1234']
            await createCarSpecificationUseCase.execute({ car_id, specifications_id })

        }).rejects.toBeInstanceOf(AppError)

    })

    it("Should be able to add a new specification to the car", async () => {
        const car =  await carRespositoryInMemory.create({
            name:"Name car",
            description:"Description of cars",
            daily_rate:100,
          
            license_plate:"ABC-1234",
            fine_amount:60,
            brand:"Fiaat",
            category_id:"category"
        })

        const specification = await  specificationsRepositoryInMemory.create({
            name: 'teste',
            description: 'teste'
        })
       // const car_id = "1234567"
        const specifications_id = [specification.id]
        const speCars = await createCarSpecificationUseCase.execute({ car_id:car.id, specifications_id })
        console.log(speCars)
        
        expect(speCars).toHaveProperty("specifications")
        expect(speCars.specifications.length).toBe(1)

    })
})