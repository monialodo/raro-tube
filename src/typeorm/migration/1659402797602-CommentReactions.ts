import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CommentReactions1659402797602 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "comment_reactions",
        columns: [
          {
            name: "comment_id",
            type: "uuid",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "reaction",
            type: "varchar",
            isNullable: true,
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
            columnNames: ["comment_id"],
            referencedTableName: "comments",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("comment_reactions");
  }
}
