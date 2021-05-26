import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserMigration1621585024986 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "usersData",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name:"age",
                    type:"number"
                }
            ]
        }),true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("usersData");
    }

}
