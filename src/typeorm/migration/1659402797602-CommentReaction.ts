import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CommentReaction1659402797602 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "comment_reaction",
                columns: [
                    {
                        name: "comment_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "userId",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "vote",
                        type: "varchar",
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
        await queryRunner.dropTable("comment_reaction");
    }
}
