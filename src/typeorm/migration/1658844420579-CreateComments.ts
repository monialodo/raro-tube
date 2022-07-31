import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateComments1658844420579 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "comments",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "upvote_quantity",
            type: "integer",
            isNullable: false,
          },
          {
            name: "downvote_quantity",
            type: "integer",
            isNullable: false,
          },
          {
            name: "video_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "student_id",
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
    await queryRunner.dropTable("comments");
  }
}
