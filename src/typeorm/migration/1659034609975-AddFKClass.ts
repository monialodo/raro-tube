import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddFKClass1659034609975 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys("class", [
      new TableForeignKey({
        columnNames: ["super_user_id"],
        referencedTableName: "super_user",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["administrator_id"],
        referencedTableName: "administrators",
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
    await queryRunner.dropForeignKeys("class", [
      new TableForeignKey({
        columnNames: ["super_user_id"],
        referencedTableName: "super_user",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["administrator_id"],
        referencedTableName: "administrators",
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
