import { Inscripcion } from '../models/inscripcion.model';

export interface CargarInscripcion {
    ok: boolean;
    inscripcion: Inscripcion;
}