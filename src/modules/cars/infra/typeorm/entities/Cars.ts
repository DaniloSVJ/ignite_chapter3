import { v4 as uuidV4 } from "uuid"
import { Column, CreateDateColumn, Entity, PrimaryColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Category } from "./Category"
import { Specification } from "./Specification";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";
@Entity("cars")
class Cars {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category
   
    @ManyToMany(() => Specification)
    @JoinTable(
        {
            name: "specifications_cars",
            joinColumn: {
                name: "car_id",
               
            },
            inverseJoinColumn: {
                name: "specification_id",
                
            }
        }

    )
    specifications: Specification[]

    @Column()
    category_id: string;



    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4(),
                this.available = true

        }
    }

}

export { Cars }
