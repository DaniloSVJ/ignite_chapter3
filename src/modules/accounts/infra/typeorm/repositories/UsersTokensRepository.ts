import { ICreateUserTokenDTOS } from "@modules/accounts/dtos/ICreateUserTokenDTOS";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UsersToken } from "../entities/UsersToken";


class UsersTokensRepository  implements IUsersTokensRepository{
    private repository: Repository<UsersToken>

    constructor(){
        this.repository = getRepository(UsersToken)
    }
    
   
    async create({ 
        expires_date, 
        refresh_token, 
        user_id }: ICreateUserTokenDTOS): Promise<UsersToken> {

                const usersToken =  await this.repository.create({
                    expires_date, 
                    refresh_token, 
                    user_id  
                }) 
                
                await this.repository.save(usersToken)

                return usersToken
        
    }
    async findByUserIdAndRefreshToken(user_id: string,refresh_token:string): Promise<UsersToken> {
        const usersToken = await this.repository.findOne({
            user_id,
            refresh_token
        })
        return usersToken
    }
    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }

}

export {UsersTokensRepository}