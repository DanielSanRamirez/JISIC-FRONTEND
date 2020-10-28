import { Inscripcion } from '../models/inscripcion.model';
import { Usuario } from '../models/usuario.model';

export interface CargarInscripcion {
    ok: boolean;
    inscripcion: Inscripcion;
}