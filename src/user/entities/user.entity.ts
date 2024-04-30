import { Column,Entity,PrimaryGeneratedColumn } from "typeorm";
@Entity({name:'users'})
export class User   {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    name:string;
    @Column({type:'text',nullable:true})
    description:string;
    @Column({nullable:true})
    edad:number
    @Column({nullable:true})
    email:string
}
