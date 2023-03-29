import {Router} from "express"
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AutenticateUserController"

const autheticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

autheticateRoutes.post("/sessions", authenticateUserController.handle)

export {autheticateRoutes}