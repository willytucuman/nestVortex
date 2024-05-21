import { Column, ChildEntity,ManyToOne} from "typeorm";
import { Entry } from "src/entries/entities/entry.entity";

@ChildEntity()
export class Consult extends Entry
{
    @Column()
    motivo:string
    @Column()
    diagnostico:string
    @Column({default:false})
    diagnosticoConfirmado:boolean
 
}
