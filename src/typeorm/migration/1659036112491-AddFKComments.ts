import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddFKComments1659036112491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys('comments',
            [
                new TableForeignKey({
                    name: 'students',
                    columnNames: ['student_id'],
                    referencedTableName: 'students',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name: 'videos',
                    columnNames: ['video_id'],
                    referencedTableName: 'videos',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
            ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys('comments',
        [
            new TableForeignKey({
                name: 'students',
                columnNames: ['student_id'],
                referencedTableName: 'students',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
            new TableForeignKey({
                name: 'videos',
                columnNames: ['video_id'],
                referencedTableName: 'videos',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        ]
    )
    }

}
