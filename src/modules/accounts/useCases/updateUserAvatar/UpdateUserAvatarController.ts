import { Request, Response } from "express"
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase"
import {container} from "tsyringe"

class UpdateUserAvatarController{

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = await request.user
        const avatar_file = await request.file.filename
       
        const updateUserAvatarUseCase = await container.resolve(UpdateUserAvatarUseCase)

        await updateUserAvatarUseCase.execute({user_id:id, avatar_file:avatar_file })

        return response.status(201).send()


    }
}

export {UpdateUserAvatarController}