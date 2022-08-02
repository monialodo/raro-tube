import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Favorites1659402862106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "class",
        columns: [
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "video_id",
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
            columnNames: ["video_id"],
            referencedTableName: "video",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Favorites");
  }
}
