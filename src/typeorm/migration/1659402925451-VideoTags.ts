import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class VideoTags1659402925451 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "class",
        columns: [
          {
            name: "video_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "tag_id",
            type: "uuid",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["video_id"],
            referencedTableName: "video",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["tag_id"],
            referencedTableName: "tag",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("videoTags");
  }
}
