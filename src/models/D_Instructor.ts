import { BaseEntity } from "typeorm/repository/BaseEntity";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('details_instructor')
export class DInstructor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 25 })
    specialty: string;
    @Column({ length: 25 })
    company_name: string;
    @Column({ length: 25, comment: 'Cargo que ejerce el instructor' })
    position_name: string;
    @Column({ comment: 'Descripción del cargo' })
    position_description: string;
    @Column()
    start_date: Date;
    @Column()
    working: Boolean;
    @OneToOne(() => User, { cascade: true })
    @JoinColumn()
    user: User;

    public update = async (body: any) => {
        if (body) {
            if (body['specialty']) this.specialty = body['specialty'];
            if (body['company_name']) this.company_name = body['company_name'];
            if (body['position_name']) this.position_name = body['position_name'];
            if (body['position_description']) this.position_description = body['position_description'];
            if (body['start_date']) this.start_date = body['start_date'];
            if (body['working']) this.working = body['working'];
        }
    }
}