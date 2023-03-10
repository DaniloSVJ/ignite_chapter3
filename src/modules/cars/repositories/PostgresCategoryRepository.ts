import { Category } from "../entities/Category";
import { ICategoriesRepository ,ICreateCategoryDTO} from "./ICategoriesRepository";

class PostgresCategoryRepositories implements ICategoriesRepository{
    findByName(name: string): Category {
        throw new Error("Method not implemented.");
    }
    list(): Category[] {
        throw new Error("Method not implemented.");
    }
    create({name,description}:ICreateCategoryDTO): void {
        throw new Error("Method not implemented.");
    }
}

export {PostgresCategoryRepositories}