
import {container} from "tsyringe"


import "@shared/container/providers/DateProvider"
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository"
import { IUserRespository } from "@modules/accounts/repositories/IUsersRespository"
import {ICategoriesRepository} from '@modules/cars/repositories/ICategoriesRepository'
import {CategoryRepository} from '@modules/cars/infra/typeorm/repositories/CategoryRepository'
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpeficationRepository"
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository"
import { ICarRepository } from "@modules/cars/repositories/ICarRepositories"
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository"
import { ICarImageRespository } from "@modules/cars/repositories/ICarImageRespository"
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage"
import { CarImageRepository } from "@modules/cars/infra/typeorm/repositories/CarImageRepository"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { RentalRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository"

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
container.registerSingleton<ICarRepository>(
    "CarRepository",
    CarRepository
    

)
container.registerSingleton<ICarImageRespository>(
    "CarImageRepository",
    CarImageRepository
)
container.registerSingleton<IRentalsRepository>(
    "RentalRepository",
    RentalRepository
)

