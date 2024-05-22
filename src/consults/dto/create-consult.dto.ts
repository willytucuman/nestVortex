import { enfermedad } from "../entities/consult.entity";
import { IsIn, IsNotEmpty } from "class-validator";
export class CreateConsultDto {
    fecha:Date;
    motivo: string;
    @IsIn([enfermedad.covid,enfermedad.dengue,enfermedad.hepatitis,enfermedad.sida])
    @IsNotEmpty({message:"Debes escribir una enfermedad"})
    diagnostico:enfermedad
    diagnosticoConfirmado: boolean;
  }
  