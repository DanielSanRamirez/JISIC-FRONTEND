// Importación del modelo
import { Pais } from './pais.model';

export class Participante {

    constructor(
        public nombres: string,
        public apellidos: string,
        public direccion: string,
        public codTelefono: Pais,
        public telefono: string,
        public email: string,
        public pais: Pais,
        public tipoIdentificacion: string,
        public identificacion: string,
        public _id?: string,
    ) { }
}