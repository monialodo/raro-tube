import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFile1658842895467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "files",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "path",
            type: "varchar",
          },
          {
            name: "sizeBytes",
            type: "bigint(13)",
          },
          {
            name: "format",
            type: "varchar",
          },
          {
            name: "type",
            type: "varchar",
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("files");
  }
}
