import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity()
export class Posts {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    userId: number;

    @CreateDateColumn()
    published: string;

    @Column()
    updated: string;


}
