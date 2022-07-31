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
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "duration",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "subjects",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "tags",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "thumbnail",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "teacher_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "class_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "comment_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("videos");
  }
}
