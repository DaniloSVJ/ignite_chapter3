import "reflect-metadata"
import { AppError } from "@shared/errors/AppError";
import { CateogoriesRepositoriesInMemory } from "@modules/cars/repositories/in-memory/CateogoriesRepositoriesInMemory";

import { CreateCategoryUseCases } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCases;
let cateogoriesRepositoriesInMemory: CateogoriesRepositoriesInMemory

describe(
    "Criar categoria",()=>{

        beforeEach(()=>{
            cateogoriesRepositoriesInMemory = new CateogoriesRepositoriesInMemory()
            createCategoryUseCase = new CreateCategoryUseCases(
                cateogoriesRepositoriesInMemory
            )

        })

        it("should be able to create a new category",async ()=>{
            
            const category = {
                name:'Categories test',
                description: "Description test"
            }
            
            await createCategoryUseCase.execute({
                name:category.name,
                description: category.description
            })

            const categoryCreated = await cateogoriesRepositoriesInMemory.findByName(
                category.name
            )
            
        

            expect(categoryCreated).toHaveProperty("id");

        })

        it("should not be able to create a new category whit name exists",async ()=>{
            
            expect(async ()=>{
                const category = {
                    name:'Categories test',
                    description: "Description test"
                }
                
                await createCategoryUseCase.execute({
                    name:category.name,
                    description: category.description
                })
                await createCategoryUseCase.execute({
                    name:category.name,
                    description: category.description
                })
            }).rejects.toBeInstanceOf(AppError)


        })        
    }
)

