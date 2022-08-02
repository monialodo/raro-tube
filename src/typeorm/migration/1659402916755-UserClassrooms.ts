import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserClassrooms1659402916755 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_classrooms",
        columns: [
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "classroom_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
          },
          {
            name: "updated_at",
            type: "timestamp",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["classroom_id"],
            referencedTableName: "classrooms",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_classrooms");
  }
}
