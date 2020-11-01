import { Inscripcion } from '../models/inscripcion.model';

export interface CargarPago {
    totalPages: number;
    inscripciones: Inscripcion[];
}