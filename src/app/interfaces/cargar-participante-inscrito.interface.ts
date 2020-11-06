import { Inscripcion } from '../models/inscripcion.model';

export interface CargarParticipanteInscrito {
    totalPages: number;
    participantes: Inscripcion[];
}