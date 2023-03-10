import {inject,injectable} from "tsyringe"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

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
        @inject("CategoriesRepository")
        private categoriesRepository:ICategoriesRepository){

    }
    execute({name,description}:IRequest):void{
        //const categoriesRepository = new CategoryRepository
        const categoryAlreadyExists = this.categoriesRepository.findByName(name)

        if(categoryAlreadyExists){
            throw new Error( "Category Already exists!")
        }
    
        this.categoriesRepository.create({name,description})
    }

}

export {CreateCategoryUseCases}