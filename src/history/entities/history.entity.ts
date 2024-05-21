import { Entity,PrimaryGeneratedColumn,Column,OneToOne,OneToMany, JoinColumn } from "typeorm";
import { Patient } from "src/patients/entities/patient.entity";
import { Entry } from "src/entries/entities/entry.entity";


@Entity()
export class History {
@PrimaryGeneratedColumn()
id:number;


@OneToOne(()=>Patient,(patient)=>patient.history)
@JoinColumn({name:"patient_id"})
patient:Patient

@OneToMany(()=>Entry,(entries)=>entries.history,{cascade:true})
@JoinColumn({name:"entries"})
entries:Entry[]

}
