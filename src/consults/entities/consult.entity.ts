import { Column, ChildEntity,ManyToOne, JoinColumn} from "typeorm";
import { Entry } from "src/entries/entities/entry.entity";
import { Medic } from "src/medics/entities/medic.entity";
export enum enfermedad {
    covid = "covid",
    dengue = "dengue",
    sida = "sida",
    hepatitis = "hepatitis"
}
@ChildEntity()
export class Consult extends Entry
{
    @Column()
    motivo:string
    @Column()
    diagnostico:enfermedad
    @Column({default:false})
    diagnosticoConfirmado:boolean
    @ManyToOne(()=>Medic,medic=>medic.consult)
    @JoinColumn({name:"medicoAsignado"})
    medic:Medic
}
