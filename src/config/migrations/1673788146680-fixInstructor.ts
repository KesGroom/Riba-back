import { MigrationInterface, QueryRunner } from "typeorm";

export class fixInstructor1673788146680 implements MigrationInterface {
    name = 'fixInstructor1673788146680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`details_instructor\` DROP COLUMN \`position_description\``);
        await queryRunner.query(`ALTER TABLE \`details_instructor\` ADD \`position_description\` varchar(255) NOT NULL COMMENT 'Descripción del cargo'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`details_instructor\` DROP COLUMN \`position_description\``);
        await queryRunner.query(`ALTER TABLE \`details_instructor\` ADD \`position_description\` varchar(25) NOT NULL COMMENT 'Descripción del cargo'`);
    }

}
