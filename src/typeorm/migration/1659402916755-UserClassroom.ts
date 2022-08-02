import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserClassroom1659402916755 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "classrooms",
        columns: [
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "classroom_id",
            type: "uuid",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["classroom_id"],
            referencedTableName: "classroom",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("classrooms");
  }
}
