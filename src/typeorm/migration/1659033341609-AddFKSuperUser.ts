import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddFKSuperUser1659033341609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('super_user',
            new TableForeignKey({
                columnNames: ['class_id'],
                referencedTableName: 'class',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('super_user',
            new TableForeignKey({
                columnNames: ['class_id'],
                referencedTableName: 'class',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        )
    }

}
