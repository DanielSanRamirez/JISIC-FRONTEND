import { Participante } from '../models/participante.model';

export interface CargarParticipanteInscrito {
    totalPages: number;
    participantes: Participante[];
}