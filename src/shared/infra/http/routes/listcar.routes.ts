import {Router} from "express"
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { CreateCarController } from "@modules/cars/useCases/createCars/CreateCarController"
import {ensureAdmin} from "@shared/infra/http/middlewares/ensureAdmin"
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController"


const carRoutes = Router()


const listAvailableCarsController = new ListAvailableCarsController()
carRoutes.get("/", listAvailableCarsController.handle) 

export {carRoutes}