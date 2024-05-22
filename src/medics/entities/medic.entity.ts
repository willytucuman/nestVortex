import { Entity,PrimaryGeneratedColumn,Column,OneToMany } from "typeorm";
import { Consult } from "src/consults/entities/consult.entity";
import { Practice } from "src/practices/entities/practice.entity";
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

  

    @OneToMany(()=>Consult,consult=>consult.medic)
    consult:Consult

    @OneToMany(()=>Practice,practice=>practice.medic)
    practice:Practice
}