
import { Participante } from './participante.model';
import { Producto } from './producto.model';

export class Inscripcion {

    constructor(
        public tipoIdentificacion: string,
        public identificacion: string,
        public participante: Participante,
        public producto: Producto,
        public costoTotal: number,
        public img?: string,
        public estado?: boolean,
        public _id?: string,
    ) { }
}