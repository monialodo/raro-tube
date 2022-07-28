import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddFKStudents1659035523852 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys('students',
            [
                new TableForeignKey({
                    columnNames: ['class_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'class',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    columnNames: ['comment_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'comments',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),

            ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys('students',
            [
                new TableForeignKey({
                    columnNames: ['class_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'class',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    columnNames: ['comment_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'comments',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),

            ])
    }

}
