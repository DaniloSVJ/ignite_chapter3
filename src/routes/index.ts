import {Router} from 'express'

import { categoriesRoutes } from "./categories.routes"
import { specificationRoutes } from './specification.routes'
import { userRoutes } from './user.routes'
import "reflect-metadata"
import { autheticateRoutes } from './authenticate.routes'

const router = Router()


router.use(autheticateRoutes)
router.use("/users",userRoutes)
router.use("/categories",categoriesRoutes)
router.use("/specification",specificationRoutes)





export {router}