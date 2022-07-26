import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateVideo1658843997425 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'video',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'duration',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'subjects',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'tags',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'thumbnail',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'teacher_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'turma_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'commentary_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'Turma',
            columnNames: ['turma_id'],
            referencedTableName: 'turma',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'Commentary',
            columnNames: ['commentary_id'],
            referencedTableName: 'commentary',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'Teacher',
            columnNames: ['teacher_id'],
            referencedTableName: 'teacher',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('video');
  }

}
