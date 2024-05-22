import { Column, ChildEntity,ManyToOne} from "typeorm";
import { Entry } from "src/entries/entities/entry.entity";
import { IsIn, } from "class-validator";
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

}
