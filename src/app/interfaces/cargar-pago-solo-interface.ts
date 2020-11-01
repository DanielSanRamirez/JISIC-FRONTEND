import { Pago } from '../models/pago.model';

export interface CargarPago {
    ok: number;
    pago: Pago;
}