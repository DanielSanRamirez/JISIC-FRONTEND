import { Usuario } from '../models/usuario.model';

export interface CargarUsuario {
    totalPages: number;
    usuarios: Usuario[];
}