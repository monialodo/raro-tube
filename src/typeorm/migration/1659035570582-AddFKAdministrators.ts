import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddFKAdministrators1659035570582 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys('administrators',
            [
                new TableForeignKey({
                    name : 'user',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name : 'class',
                    columnNames: ['class_id'],
                    referencedTableName: 'class',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),

            ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys('administrators',
        [
            new TableForeignKey({
                name : 'user',
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
            new TableForeignKey({
                name : 'class',
                columnNames: ['class_id'],
                referencedTableName: 'class',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),

        ]
    )
    }

}
