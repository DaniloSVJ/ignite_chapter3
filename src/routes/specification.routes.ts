import {Router} from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController"


const specificationRoutes = Router()


const createSpecifictionController = new CreateSpecificationController()
specificationRoutes.use(ensureAuthenticated)
specificationRoutes.post("/", createSpecifictionController.handle) 

export {specificationRoutes}
