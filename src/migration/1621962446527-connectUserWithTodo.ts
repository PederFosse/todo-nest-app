import {MigrationInterface, QueryRunner} from "typeorm";

export class connectUserWithTodo1621962446527 implements MigrationInterface {
    name = 'connectUserWithTodo1621962446527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "ownerId" uuid`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_05552e862619dc4ad7ec8fc9cb8" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_05552e862619dc4ad7ec8fc9cb8"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "ownerId"`);
    }

}
