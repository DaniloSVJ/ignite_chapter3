import "reflect-metadata"

import {Router} from 'express'

import { categoriesRoutes } from "./categories.routes"
import { specificationRoutes } from './specification.routes'
import { userRoutes } from './user.routes'
import { autheticateRoutes } from './authenticate.routes'
import { carRoutes } from './car.routes'
import {rentalRoutes} from './rental.routes'

const router = Router()


router.use(autheticateRoutes)
router.use("/users",userRoutes)
router.use("/categories",categoriesRoutes)
router.use("/specification",specificationRoutes)
router.use("/cars",carRoutes)
router.use("/rental",rentalRoutes)





export {router}