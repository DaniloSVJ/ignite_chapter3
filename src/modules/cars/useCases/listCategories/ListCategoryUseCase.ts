import { Category } from "../../entities/Category";
import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import {inject,injectable} from 'tsyringe'

@injectable()
class ListCategoriesUseCase{

    constructor (
        @inject("CategoryRepository")
        private categoriesRepository: ICategoriesRepository){}
    async execute():Promise<Category[]>{
        const categories = await this.categoriesRepository.list()

        return categories
    }

}

export {ListCategoriesUseCase}