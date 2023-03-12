
import {container} from "tsyringe"
import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository"
import { IUserRespository } from "../../modules/accounts/repositories/IUsersRespository"
import {ICategoriesRepository} from '../../modules/cars/repositories/ICategoriesRepository'
import {CategoryRepository} from '../../modules/cars/repositories/implementations/CategoryRepository'
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository"
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpeficationRepository"

container.registerSingleton<ICategoriesRepository>(
    "CategoryRepository",
    CategoryRepository

)


container.registerSingleton<ISpecificationsRepository>(
    "SpecificationRepository",
    SpecificationRepository

)

container.registerSingleton<IUserRespository>(
    "UserRepository",
    UserRepository

)