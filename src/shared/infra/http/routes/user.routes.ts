import {Router} from "express"
import multer from "multer"

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController"
import {UpdateUserAvatarController} from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController"
import uploadConfig from "@config/upload"
import {ensureAdmin} from "@shared/infra/http/middlewares/ensureAdmin"
import {ensureAuthenticated} from "@shared/infra/http/middlewares/ensureAuthenticated"

const userRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))                                        
const updateUserAvatarController = new UpdateUserAvatarController()
const createUserController = new CreateUserController()

userRoutes.post("/", createUserController.handle) 
userRoutes.patch("/avatar",
ensureAuthenticated,

uploadAvatar.single("avatar"),
updateUserAvatarController.handle)
export {userRoutes}
