import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { isDebuggerStatement } from "typescript";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpeficationRepository";


class SpecificationRepositoriesInMemory implements ISpecificationsRepository{
    specifications: Specification[] = []
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specifications = new Specification()

        Object.assign(specifications,{
            name,
            description
        })

        this.specifications.push(specifications)

        return specifications
    }
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(specifications=>specifications.name===name)
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allspecifications = this.specifications.filter(specifications=>ids.includes(specifications.id))

        return allspecifications
    }
}


export {SpecificationRepositoriesInMemory}