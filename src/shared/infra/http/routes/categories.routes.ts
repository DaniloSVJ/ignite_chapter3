import {Router} from "express"
import  {CreateCategoryController}  from "@modules/cars/useCases/createCategory/CreateCategoryController"
import { ListCategoryController } from "@modules/cars/useCases/listCategories/ListCategoryController"
import {ensureAdmin} from "@shared/infra/http/middlewares/ensureAdmin"
import {ensureAuthenticated} from "@shared/infra/http/middlewares/ensureAuthenticated"

import multer from 'multer'

import { ImportCategoryController } from "@modules/cars/useCases/importCategory/importCategoryController"
const upload = multer({
  dest: "./tmp"
})

const createCategoryController = new CreateCategoryController()
const categoriesRoutes = Router()
const listCategoryController= new ListCategoryController()
categoriesRoutes.get('/',listCategoryController.handle)
categoriesRoutes.use(ensureAuthenticated,ensureAdmin)

categoriesRoutes.post("/", createCategoryController.handle)

const importCategoryController = new ImportCategoryController()

categoriesRoutes.post('/import',upload.single("file"),importCategoryController.handle)

export {categoriesRoutes}