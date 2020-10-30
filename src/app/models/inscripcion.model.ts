import { Participante } from './participante.model';
import { Producto } from './producto.model';
import { Pago } from './pago.model';

/* Importación de variables globales */
import { GLOBAL } from '../services/global'

const base_url = GLOBAL.base_url;

export class Inscripcion {

    constructor(
        public participante: Participante,
        public producto: Producto,
        public costoTotal: number,
        public institucion?: string,
        public img?: string,
        public estado?: boolean,
        public _id?: string,
        public estadoParticipante?: boolean,
        public estadoRecibo?: boolean,
        public pago?: Pago
    ) { }
}