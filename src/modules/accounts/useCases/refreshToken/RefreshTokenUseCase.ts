import auth from "@config/auth"
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository"
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import {sign, verify} from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

interface IPayload{
    sub:string;
    email:string;
}

@injectable()
class RefreshTokenUseCase{
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    
    ){}
    async execute(token:string){
        const decode = await verify(token,auth.secret_refresh_token) as IPayload
        const user_id = decode.sub
        const email = decode.email
        const {expires_in_refresh_token,expires_refresh_token_days,expires_token,secret_refresh_token,secret_token} = auth
        const userToken = await this.usersTokensRepository
        .findByUserIdAndRefreshToken(
            user_id,
            token
        )
        if(!userToken){
            throw new AppError("Refresh Token does not exists!")
        }    
        await this.usersTokensRepository.deleteById(userToken.id)

        const refresh_token = sign({email},secret_refresh_token,{
            subject:user_id,
            expiresIn:expires_in_refresh_token
        })
        const expires_date = this.dateProvider.addDays(expires_refresh_token_days)

        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id
        })

        return refresh_token
    }
}
export {RefreshTokenUseCase}