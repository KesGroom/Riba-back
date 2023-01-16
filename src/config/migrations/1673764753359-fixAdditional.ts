import { MigrationInterface, QueryRunner } from "typeorm";

export class fixAdditional1673764753359 implements MigrationInterface {
    name = 'fixAdditional1673764753359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`academic_information\` DROP COLUMN \`start_date\``);
        await queryRunner.query(`ALTER TABLE \`academic_information\` DROP COLUMN \`teaching_stage\``);
        await queryRunner.query(`ALTER TABLE \`academic_information\` ADD \`teaching_stage\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`academic_information\` DROP COLUMN \`productive_stage\``);
        await queryRunner.query(`ALTER TABLE \`academic_information\` ADD \`productive_stage\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`academic_information\` DROP COLUMN \`training_level\``);
        await queryRunner.query(`ALTER TABLE \`academic_information\` ADD \`training_level\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`academic_information\` DROP COLUMN \`training_level\``);
        await queryRunner.query(`ALTER TABLE \`academic_information\` ADD \`training_level\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`academic_information\` DROP COLUMN \`productive_stage\``);
        await queryRunner.query(`ALTER TABLE \`academic_information\` ADD \`productive_stage\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`academic_information\` DROP COLUMN \`teaching_stage\``);
        await queryRunner.query(`ALTER TABLE \`academic_information\` ADD \`teaching_stage\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`academic_information\` ADD \`start_date\` datetime NOT NULL`);
    }

}
