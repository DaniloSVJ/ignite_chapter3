import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentelUseCase } from "./DevolutionRentelUseCase";


class DevolutionController{
    async handle(request:Request, response:Response):Promise<Response>{
        const {id:user_id}= request.user
        const {id}= request.params

        const devolutionRentelUseCase = container.resolve(DevolutionRentelUseCase)

        const rental = await devolutionRentelUseCase.execute(
            {id,user_id}
        )

        return response.status(200).json()


    }

}


export {DevolutionController}