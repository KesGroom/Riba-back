import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1673498061239 implements MigrationInterface {
    name = 'FirstMigration1673498061239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`dni\` varchar(255) NOT NULL, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`roleId\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`dni\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`auth_tokens\` (\`key\` varchar(255) NOT NULL, \`jwt\` varchar(255) NOT NULL, \`expired\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userDni\` varchar(255) NULL, UNIQUE INDEX \`REL_e6da4f6b74fc89a3f37af4d4df\` (\`userDni\`), PRIMARY KEY (\`key\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`academic_information\` (\`id\` int NOT NULL AUTO_INCREMENT, \`regional\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`modality\` varchar(255) NOT NULL, \`group\` varchar(255) NOT NULL, \`teaching_stage\` varchar(255) NOT NULL, \`productive_stage\` varchar(255) NOT NULL, \`training_level\` varchar(255) NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`academic_information\` varchar(255) NOT NULL, \`userDni\` varchar(255) NULL, UNIQUE INDEX \`REL_b4672c4b98cc5644b049c22ed4\` (\`userDni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`details_instructor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`specialty\` varchar(25) NOT NULL, \`company_name\` varchar(25) NOT NULL, \`position_name\` varchar(25) NOT NULL COMMENT 'Cargo que ejerce el instructor', \`position_description\` varchar(25) NOT NULL COMMENT 'Descripción del cargo', \`start_date\` datetime NOT NULL, \`working\` tinyint NOT NULL, \`userDni\` varchar(255) NULL, UNIQUE INDEX \`REL_1a8d0886e0ebae500340654bb1\` (\`userDni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`personal_information\` (\`id\` int NOT NULL AUTO_INCREMENT, \`gender\` varchar(255) NOT NULL, \`birthday\` datetime NOT NULL, \`disability\` varchar(255) NOT NULL, \`stratum\` int NOT NULL, \`personal_description\` varchar(255) NOT NULL, \`userDni\` varchar(255) NULL, UNIQUE INDEX \`REL_615232cf11a6cc291a0572239f\` (\`userDni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recovery_code\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`code\` varchar(6) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD CONSTRAINT \`FK_e6da4f6b74fc89a3f37af4d4dff\` FOREIGN KEY (\`userDni\`) REFERENCES \`users\`(\`dni\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`academic_information\` ADD CONSTRAINT \`FK_b4672c4b98cc5644b049c22ed43\` FOREIGN KEY (\`userDni\`) REFERENCES \`users\`(\`dni\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`details_instructor\` ADD CONSTRAINT \`FK_1a8d0886e0ebae500340654bb1c\` FOREIGN KEY (\`userDni\`) REFERENCES \`users\`(\`dni\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`personal_information\` ADD CONSTRAINT \`FK_615232cf11a6cc291a0572239fc\` FOREIGN KEY (\`userDni\`) REFERENCES \`users\`(\`dni\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`personal_information\` DROP FOREIGN KEY \`FK_615232cf11a6cc291a0572239fc\``);
        await queryRunner.query(`ALTER TABLE \`details_instructor\` DROP FOREIGN KEY \`FK_1a8d0886e0ebae500340654bb1c\``);
        await queryRunner.query(`ALTER TABLE \`academic_information\` DROP FOREIGN KEY \`FK_b4672c4b98cc5644b049c22ed43\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP FOREIGN KEY \`FK_e6da4f6b74fc89a3f37af4d4dff\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`DROP TABLE \`recovery_code\``);
        await queryRunner.query(`DROP INDEX \`REL_615232cf11a6cc291a0572239f\` ON \`personal_information\``);
        await queryRunner.query(`DROP TABLE \`personal_information\``);
        await queryRunner.query(`DROP INDEX \`REL_1a8d0886e0ebae500340654bb1\` ON \`details_instructor\``);
        await queryRunner.query(`DROP TABLE \`details_instructor\``);
        await queryRunner.query(`DROP INDEX \`REL_b4672c4b98cc5644b049c22ed4\` ON \`academic_information\``);
        await queryRunner.query(`DROP TABLE \`academic_information\``);
        await queryRunner.query(`DROP INDEX \`REL_e6da4f6b74fc89a3f37af4d4df\` ON \`auth_tokens\``);
        await queryRunner.query(`DROP TABLE \`auth_tokens\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
