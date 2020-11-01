// Importación del modelo
import { Pais } from './pais.model';

export class Pago {

    constructor(
        public nombres: string,
        public direccion: string,
        public codTelefono: Pais,
        public telefono: string,
        public tipoIdentificacion: string,
        public identificacion: string,
        public nombreBanco: string,
        public numeroTransaccion: number,
        public fechaTransaccion: string,
        public apellidos?: string,
        public _id?: string,
        public imgDeposito?: string,
    ) { }
}