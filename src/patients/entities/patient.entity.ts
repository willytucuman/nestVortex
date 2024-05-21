import { Entity,PrimaryGeneratedColumn,Column,OneToOne,OneToMany, JoinColumn } from "typeorm";
import { Entry } from "src/entries/entities/entry.entity";
import { History } from "src/history/entities/history.entity";

@Entity()
export class Patient {
@PrimaryGeneratedColumn()
id:number

@Column()
name:string

@Column()
lastName:string

@Column({unique:true})
DNI:number

@Column()
nacimiento:Date

@Column({nullable:true})
obraSocial:string

@OneToMany(()=>Entry,entry=>entry.patient)
entry:Entry[]


@OneToOne(()=>History,(history)=>history.patient)
history:History



}
