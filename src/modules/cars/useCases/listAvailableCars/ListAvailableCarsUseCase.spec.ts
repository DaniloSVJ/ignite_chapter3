import { CarRespositoryInMemory } from "@modules/cars/repositories/in-memory/CarRespositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listCarsUseCase: ListAvailableCarsUseCase
let carRespositoryInMemory: CarRespositoryInMemory
describe("List Cars",()=>{

    beforeEach(()=>{
        carRespositoryInMemory = new CarRespositoryInMemory()
        listCarsUseCase = new ListAvailableCarsUseCase(carRespositoryInMemory)
    })

    it("Should be able to list  all avaliable cars",async ()=>{
       const car =  await carRespositoryInMemory.create({
            name: "car1",
            brand:"Fiate",
            description: "Com duas portas",
            daily_rate:140 ,
            license_plate:"1234-ABC",
            fine_amount:100,
            category_id:"category_id"
        })

       const cars = await listCarsUseCase.execute({
        brand:"Fiate",
       })

       console.log(cars)
       expect(cars).toEqual([car])
    })

    it("Should be able to list  all avaliable cars by brands",async ()=>{
        const car =  await carRespositoryInMemory.create({
            name: "car1",
            description: "Com duas portas",
            daily_rate:140 ,
            license_plate:"1234-ABC",
            fine_amount:100,
            brand:"Fiate",
            category_id:"category_id"
        })

        const cars = await listCarsUseCase.execute({
            brand:"Fiate",
        })

        console.log(cars)
        expect(cars).toEqual([car])
    })
    it("Should be able to list  all avaliable cars by name",async ()=>{
        const car =  await carRespositoryInMemory.create({
            name: "car1",
            description: "Com duas portas",
            daily_rate:140 ,
            license_plate:"1234-ABC",
            fine_amount:100,
            brand:"Fiate",
            category_id:"category_id"
        })

        const cars = await listCarsUseCase.execute({
            name: "car1",
        })

        console.log(cars)
        expect(cars).toEqual([car])
    })
    it("Should be able to list  all avaliable cars by name",async ()=>{
        const car =  await carRespositoryInMemory.create({
            name: "car1",
            description: "Com duas portas",
            daily_rate:140 ,
            license_plate:"1234-ABC",
            fine_amount:100,
            brand:"Fiate",
            category_id:"category_id"
        })

        const cars = await listCarsUseCase.execute({
            category_id: "category_id",
        })

        console.log(cars)
        expect(cars).toEqual([car])
    })
    
})