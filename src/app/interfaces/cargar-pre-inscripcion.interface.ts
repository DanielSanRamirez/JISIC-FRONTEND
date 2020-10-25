import { Inscripcion } from '../models/inscripcion.model';

export interface CargarPreInscripcion {
    totalPages: number;
    inscripciones: Inscripcion[];
}