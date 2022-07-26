import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateClass1658843395830 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'class',
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
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'logo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'tags',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'super_user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'administrator_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'teacher_id',
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
            name: 'ForeignKeySuperUser',
            columnNames: ['super_user_id'],
            referencedTableName: 'super_user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'ForeignKeyAdministrator',
            columnNames: ['administrator_id'],
            referencedTableName: 'administrator',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'ForeignKeyTeacher',
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
    await queryRunner.dropTable('class');
  }

}
