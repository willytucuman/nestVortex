import { enfermedad } from "../entities/consult.entity";
import { IsIn } from "class-validator";
export class CreateConsultDto {
    fecha:Date;
    motivo: string;
    @IsIn([enfermedad.covid,enfermedad.dengue,enfermedad.hepatitis,enfermedad.sida])
    diagnostico:enfermedad
    diagnosticoConfirmado: boolean;
  }
  