import { Entry } from "src/entries/entities/entry.entity";
import { Medic } from "src/medics/entities/medic.entity";
import { Column ,ChildEntity, ManyToOne, JoinColumn} from "typeorm";
@ChildEntity()
export class Practice extends Entry {
    @Column({type: "interval"})
    duracion:string
     
    @Column({nullable:true})
    complicaciones:string

    @Column()
    resultadoFinal:string
    
    @ManyToOne(()=>Medic,medic=>medic.practice)
    @JoinColumn({name:"medicoAsignado"})
    medic:Medic
}
