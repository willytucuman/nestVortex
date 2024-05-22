import { Entry } from "src/entries/entities/entry.entity";
import { Column ,ChildEntity} from "typeorm";
@ChildEntity()
export class Practice extends Entry {
    @Column({type: "interval"})
    duracion:string

    @Column({nullable:true})
    complicaciones:string

    @Column()
    resultadoFinal:string

}
