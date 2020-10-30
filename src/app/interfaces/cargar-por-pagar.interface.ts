import { Inscripcion } from '../models/inscripcion.model';

export interface CargarPorPagar {
    totalPages: number;
    inscripciones: Inscripcion[];
}