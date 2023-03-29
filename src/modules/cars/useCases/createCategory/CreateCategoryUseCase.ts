import "reflect-metadata"
import {inject,injectable} from "tsyringe"
import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IRequest{
    name:string;
    description:string;

}
/**
    [] -definir o tipo de retorno
    [] -alterar o retorno do erro
    [] -acessar registro
    [] -retornar algo
**/

@injectable()
class CreateCategoryUseCases{

    constructor(
        @inject("CategoryRepository")
        private categoriesRepository:ICategoriesRepository){

    }
    async execute({name,description}:IRequest):Promise<void>{
        //const categoriesRepository = new CategoryRepository
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

        if(categoryAlreadyExists){
            throw new AppError("Category Already exists!")
        }
    
        this.categoriesRepository.create({name,description})
    }


}

export {CreateCategoryUseCases}