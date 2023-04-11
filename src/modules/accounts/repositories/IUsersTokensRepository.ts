import { ICreateUserTokenDTOS } from "../dtos/ICreateUserTokenDTOS"
import { UsersToken } from "../infra/typeorm/entities/UsersToken"


interface IUsersTokensRepository{
    create(
        {
            expires_date,
            refresh_token,
            user_id
        }:ICreateUserTokenDTOS):Promise<UsersToken>;
        findByUserIdAndRefreshToekn(user_id:string,refresh_token:string):Promise<UsersToken>;
        deleteById(id:string):Promise<void>
}       

export {IUsersTokensRepository}