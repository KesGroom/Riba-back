import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('personal_information')
export class PInformation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    gender: string;
    @Column()
    birthday: Date;
    @Column()
    disability: string;
    @Column()
    stratum: number;
    @Column()
    personal_description: string;

    @OneToOne(() => User, { cascade: true })
    @JoinColumn()
    user: User;

    public update = async (body: any) => {
        if (body) {
            if (body['gender']) this.gender = body['gender'];
            if (body['birthday']) this.birthday = body['birthday'];
            if (body['disability']) this.disability = body['disability'];
            if (body['stratum']) this.stratum = body['stratum'];
            if (body['personal_description']) this.personal_description = body['personal_description'];
        }
    }
}