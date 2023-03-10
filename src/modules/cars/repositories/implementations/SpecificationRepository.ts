import { Repository,getRepository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpeficationRepository";


class SpecificationRepository implements ISpecificationsRepository{
    private repository: Repository<Specification>;

    constructor(){
        this.repository = getRepository(Specification   )
    }
    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification =  await this.repository.create({
            name,
            description
        })
        await this.repository.save(specification)
    }
    
    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({name})
        return specification
    }

    
}

export {SpecificationRepository}