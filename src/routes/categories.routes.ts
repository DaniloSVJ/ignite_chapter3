import {Router} from "express"
import  {CreateCategoryController}  from "../modules/cars/useCases/createCategory/CreateCategoryController"
import { ListCategoryController } from "../modules/cars/useCases/listCategories/ListCategoryController"

import multer from 'multer'

import { ImportCategoryController } from "../modules/cars/useCases/importCategory/importCategoryController"
const upload = multer({
  dest: "./tmp"
})

const createCategoryController = new CreateCategoryController()
const categoriesRoutes = Router()

categoriesRoutes.post("/", createCategoryController.handle)
const listCategoryController= new ListCategoryController()
categoriesRoutes.get('/',listCategoryController.handle)

const importCategoryController = new ImportCategoryController()

categoriesRoutes.post('/import',upload.single("file"),importCategoryController.handle)

export {categoriesRoutes}