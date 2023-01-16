import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";


@Entity('auth_tokens')
export class Auth extends BaseEntity {
    @PrimaryColumn()
    key: string
    @Column()
    jwt: string
    @Column()
    expired: string
    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @CreateDateColumn()
    created_at: Date

    update = async (body: any) => {

    }
}