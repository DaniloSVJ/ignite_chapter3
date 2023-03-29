import {MigrationInterface, QueryRunner,Table,TableForeignKey} from "typeorm";

export class CreateCarImagem1679782964039 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cars_image",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary:true
                    },
                    {
                        name: "car_id",
                        type: "uuid"
                    },
                    {
                        name: "image_name",
                        type: "varchar"
                    },
                    {
                        name: "create_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],foreignKeys:[
                    {
                        name: "FKCarImage",
                        referencedTableName: "cars",
                        referencedColumnNames: ["id"],
                        columnNames: ["car_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
            
                ]
            })
        )
        // await queryRunner.createForeignKey(
        //     "cars_image",
        //         new TableForeignKey({
        //             name: "FKCarImage",
        //                 referencedTableName: "cars",
        //                 referencedColumnNames: ["id"],
        //                 columnNames: ["car_id"],
        //                 onDelete: "SET NULL",
        //                 onUpdate: "SET NULL"
        //         })
        // )
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropForeignKey(
        //     "cars_image_cars",
        //     "FKCarImage"
        // )
        queryRunner.dropTable("cars_image")

    }

}
