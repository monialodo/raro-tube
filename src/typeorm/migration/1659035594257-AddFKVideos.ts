import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddFKVideos1659035594257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys("videos", [
      new TableForeignKey({
        columnNames: ["class_id"],
        referencedTableName: "class",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["comment_id"],
        referencedTableName: "comments",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["teacher_id"],
        referencedTableName: "teachers",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys("videos", [
      new TableForeignKey({
        columnNames: ["class_id"],
        referencedTableName: "class",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["comment_id"],
        referencedTableName: "comments",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["teacher_id"],
        referencedTableName: "teachers",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    ]);
  }
}
