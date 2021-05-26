import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPhoneNotoUsersData1621592007554 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usersTable = await queryRunner.getTable("usersData");
        const PhoneNoColumn = new TableColumn({ name: "PhoneNo", type: "number" });
        await queryRunner.addColumn(usersTable, PhoneNoColumn);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const usersTable = await queryRunner.getTable("usersData");
        await queryRunner.dropColumn(usersTable, "PhoneNo");
    }

}
