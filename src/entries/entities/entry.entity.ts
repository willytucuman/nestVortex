import { Entity,PrimaryGeneratedColumn,Column, JoinColumn, OneToMany,ManyToOne,TableInheritance } from "typeorm";
import { Patient } from "src/patients/entities/patient.entity";
import { History } from "src/history/entities/history.entity";
import { Medic } from "src/medics/entities/medic.entity";

export enum typeEntry {
  practica="practica",
  consulta= "consulta"
}

@Entity()
@TableInheritance({ column: { type: "varchar", name: "entry_type" } })
export class Entry {

@PrimaryGeneratedColumn()
id:number

@Column({name:"type"})
type:typeEntry

@Column({nullable:true})
fecha:Date

@ManyToOne(()=>Patient,(patient)=>patient.entry)
patient:Patient

@ManyToOne(()=>Medic,medic=>medic.entry)
@JoinColumn({name:"medic_id"})
medic:Medic

@ManyToOne(()=>History,(history)=>history.entries)
history:History

}
