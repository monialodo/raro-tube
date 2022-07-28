import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddFKClass1659034609975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys('class',
            [
                new TableForeignKey({
                    name: 'super_user',
                    columnNames: ['super_user_id'],
                    referencedTableName: 'super_user',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name: 'administrator',
                    columnNames: ['administrator_id'],
                    referencedTableName: 'administrators',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name: 'teacher',
                    columnNames: ['teacher_id'],
                    referencedTableName: 'teachers',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),


            ]
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys('class',
            [
                new TableForeignKey({
                    name: 'super_user',
                    columnNames: ['super_user_id'],
                    referencedTableName: 'super_user',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name: 'administrator',
                    columnNames: ['administrator_id'],
                    referencedTableName: 'administrators',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name: 'teacher',
                    columnNames: ['teacher_id'],
                    referencedTableName: 'teachers',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),


            ]
        )
    }

}
