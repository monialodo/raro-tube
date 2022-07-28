import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddFKTeachers1659035606248 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys('teachers',
            [
                new TableForeignKey({
                    name: 'class',
                    columnNames: ['class_id'],
                    referencedTableName: 'class',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name : 'videos',
                    columnNames: ['video_id'],
                    referencedTableName: 'videos',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name : 'user',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),


            ]
        )
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys('teachers',
            [
                new TableForeignKey({
                    name: 'class',
                    columnNames: ['class_id'],
                    referencedTableName: 'class',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name : 'videos',
                    columnNames: ['video_id'],
                    referencedTableName: 'videos',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name : 'user',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),


            ]
        )
    }

}
