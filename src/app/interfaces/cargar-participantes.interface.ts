import { Participante } from '../models/participante.model';

export interface CargarParticipante {
    totalPages: number;
    participantes: Participante[];
}