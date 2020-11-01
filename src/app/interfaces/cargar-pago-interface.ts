import { Pago } from '../models/pago.model';

export interface CargarPagos {
    totalPages: number;
    pagos: Pago[];
}