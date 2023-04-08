import {Router} from "express"
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { CreateRentalsControllers } from "@modules/rentals/useCases/createRendals/CreateRentalsControllers"
import { DevolutionController } from "@modules/rentals/useCases/devolutionRentel/DevolutionController"
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController"


const rentalRoutes = Router()


const createRentalController = new CreateRentalsControllers()
const devolutionRentalController = new DevolutionController()
const listRentalsByUserController = new ListRentalsByUserController()
rentalRoutes.post("/",ensureAuthenticated, createRentalController.handle) 
rentalRoutes.post("/devolution/:id",ensureAuthenticated, devolutionRentalController.handle) 
rentalRoutes.get("/",ensureAuthenticated, listRentalsByUserController.handle) 

export {rentalRoutes}