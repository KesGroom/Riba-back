import { JoinColumn, ManyToOne, OneToOne, UpdateDateColumn } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { PrimaryColumn } from 'typeorm/decorator/columns/PrimaryColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Role } from './Rol';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryColumn()
    dni: string;
    @Column()
    firstname: string;
    @Column()
    lastname: string;
    @Column({ unique: true })
    email: string;
    @Column()
    password: string;
    @Column()
    state: string;
    @Column()
    city: string;
    @Column()
    address: string;
    @Column()
    phone: string;
    @ManyToOne(() => Role, { cascade: true })
    @JoinColumn()
    role: Role;

    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date

    public update = async (body: any, role?:any) => {
        if (body) {

            if (body['firstname']) this.firstname = body['firstname'];
            if (body['lastname']) this.lastname = body['lastname'];
            if (body['phone']) this.phone = body['phone'];
            if (body['email']) this.email = body['email'];
            if (body['state']) this.state = body['state'];
            if (body['city']) this.city = body['city'];
            if (body['address']) this.address = body['address'];
            if (role) {
                const role_ = await Role.findOneBy({ id: role });
                if (role_) this.role = role_;
            }
        }
    }
}