import {Router} from "express"
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { CreateRentalsControllers } from "@modules/rentals/useCases/createRendals/CreateRentalsControllers"


const rentalRoutes = Router()


const createRentalController = new CreateRentalsControllers()
rentalRoutes.post("/",ensureAuthenticated, createRentalController.handle) 

export {rentalRoutes}