import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVideos1658843997425 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "videos",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "video_file_id",
            type: "uuid",
          },
          {
            name: "thumbnail_file_id",
            type: "uuid",
          },
          {
            name: "teacher_id",
            type: "uuid",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "duration",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
          },
          {
            name: "updated_at",
            type: "timestamp",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["thumbnail_file_id"],
            referencedTableName: "files",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["video_file_id"],
            referencedTableName: "files",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["teacher_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("videos");
  }
}
