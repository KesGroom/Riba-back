import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('recovery_code')
export class Recovery extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column({ length: 6 })
    code: string;

    public update = async () => {
        
    }
}