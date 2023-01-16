import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { BaseEntity } from "typeorm/repository/BaseEntity";

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string

    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}