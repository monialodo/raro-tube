import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateStudent1658843621111 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'student',
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
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'commentary_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'turma_id',
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
            referencedColumnNames: ['id'],
            referencedTableName: 'turma',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'Commentary',
            columnNames: ['commentary_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'commentary',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('student');
  }

}
