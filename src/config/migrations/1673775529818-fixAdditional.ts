import { MigrationInterface, QueryRunner } from "typeorm";

export class fixAdditional1673775529818 implements MigrationInterface {
    name = 'fixAdditional1673775529818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`academic_information\` DROP COLUMN \`training_level\``);
        await queryRunner.query(`ALTER TABLE \`academic_information\` ADD \`training_level\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`academic_information\` DROP COLUMN \`training_level\``);
        await queryRunner.query(`ALTER TABLE \`academic_information\` ADD \`training_level\` datetime NOT NULL`);
    }

}
