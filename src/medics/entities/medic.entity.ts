import { Entity,PrimaryGeneratedColumn,Column,OneToMany } from "typeorm";
import { Entry } from "src/entries/entities/entry.entity";
@Entity()
export class Medic {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    lastName: string

    @Column({unique:true})
    numeroMatricula: number
    
    @Column()
    especialidad:string
    
    @Column()
    fechaIngreso:Date 

   @OneToMany(()=>Entry,entry=>entry.medic)
    entry:Entry[]

    

}