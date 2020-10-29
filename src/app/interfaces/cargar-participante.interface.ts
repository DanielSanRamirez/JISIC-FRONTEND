import { Participante } from '../models/participante.model';

export interface CargarParticipanteSolo {
    ok: boolean;
    participante: Participante;
}