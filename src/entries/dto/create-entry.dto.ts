import { IsDateString, IsNumber } from "class-validator";

export class CreateEntryDto {
    id:number;
    @IsDateString()
    fecha:Date;
    @IsNumber()
    patient_id:number
    @IsNumber()
    medic_id:number
}
