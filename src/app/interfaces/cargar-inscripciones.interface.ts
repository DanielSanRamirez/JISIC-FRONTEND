import { Inscripcion } from '../models/inscripcion.model';

export interface CargarInscripciones {
    ok: boolean;
    inscripciones: Inscripcion[];
}