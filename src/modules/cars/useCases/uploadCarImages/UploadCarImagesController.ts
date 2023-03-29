import { Request, Response } from "express"
import { container } from "tsyringe"
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase"

interface IFile{
    filename: string
}
class UploadCarImagesController{
    async handle(request:Request, response:Response):Promise<Response>{
        const {id}= request.params
        const images = request.files as IFile[]
        const uploadCarImageUseCase = await container.resolve(UploadCarImagesUseCase)
        const image_name = images.map((file)=>file.filename)
        await uploadCarImageUseCase.execute({car_id:id, image_name})
        return response.status(201).send()

    }
}

export {UploadCarImagesController}