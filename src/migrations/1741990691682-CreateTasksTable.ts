import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasksTable1741990691682 implements MigrationInterface {
  name = 'CreateTasksTable1741990691682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "task" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "completed" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_task_id" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "task"`);
  }
}
