import { IUserRespository } from "@modules/accounts/repositories/IUsersRespository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4} from "uuid";

@injectable()
class SendForgotPasswordMailUseCase{
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRespository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider,
        
        
    ){}
    async execute(email:string){
        const user = await this.userRepository.findByEmail(email)
        
        if(!user){
            throw new AppError("User does not exists!")
        }

        const token = uuidV4()

        const expires_date = this.dateProvider.addHours(3)

        await this.usersTokensRepository.create(
            {
                expires_date,
                user_id: user.id,
                refresh_token:token
            }
        )

        await this.mailProvider.sendMail(
            email,
            "Recuperação de Senha",
            `O link para o reset é ${token}`
        )

    }
}


export {SendForgotPasswordMailUseCase}


