import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('academic_information')
export class AInformation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    regional: string;
    @Column()
    location: string;
    @Column()
    modality: string;
    @Column()
    group: string;
    @Column()
    teaching_stage: Date;
    @Column()
    productive_stage: Date;
    @Column()
    training_level: string;
    @Column()
    end_date: Date;
    @Column()
    academic_information: string;

    @OneToOne(() => User, { cascade: true })
    @JoinColumn()
    user: User;

    public update = async (body: any) => {
        if (body) {
            if (body['regional']) this.regional = body['regional'];
            if (body['location']) this.location = body['location'];
            if (body['modality']) this.modality = body['modality'];
            if (body['group']) this.group = body['group'];
            if (body['teaching_stage']) this.teaching_stage = body['teaching_stage'];
            if (body['productive_stage']) this.productive_stage = body['productive_stage'];
            if (body['training_level']) this.training_level = body['training_level'];
            if (body['end_date']) this.end_date = body['end_date'];
            if (body['academic_information']) this.academic_information = body['academic_information'];
        }
    }
}