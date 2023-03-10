import {Router} from "express"
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController"


const specificationRoutes = Router()


const createSpecifictionController = new CreateSpecificationController()

specificationRoutes.post("/", createSpecifictionController.handle) 

export {specificationRoutes}