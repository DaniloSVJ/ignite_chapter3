import {Router} from "express"
import multer from "multer"
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { CreateCarController } from "@modules/cars/useCases/createCars/CreateCarController"
import {ensureAdmin} from "@shared/infra/http/middlewares/ensureAdmin"
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController"

import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarsSpecifications/CreateCarSpecificationController"
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController"
import uploadConfig from "@config/upload"


const carRoutes = Router()

const upload = multer(uploadConfig.upload("./tmp/avatar"))                                        

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController=new UploadCarImagesController()
carRoutes.get("/available", listAvailableCarsController.handle) 
carRoutes.use(ensureAuthenticated,ensureAdmin)
carRoutes.post("/specification/:id", createCarSpecificationController.handle)
carRoutes.post("/", createCarController.handle) 
carRoutes.post("/imagens/:id", upload.array("images") ,uploadCarImagesController.handle) 

export {carRoutes}