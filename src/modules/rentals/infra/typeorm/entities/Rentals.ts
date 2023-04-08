import { v4 as uuidV4 } from "uuid"
import { Column, CreateDateColumn, Entity, PrimaryColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable, UpdateDateColumn } from "typeorm"
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";

@Entity("rentals")
class Rentals {
    @PrimaryColumn()
    id: string;

    @ManyToOne(()=>Cars)
    @JoinColumn({name:'car_id'})
    car: Cars

    @Column()
    car_id: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    expected_return_date: Date;

    @Column()
    total: number;

   
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4()

        }
    }

}

export { Rentals }
