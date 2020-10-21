import { Producto } from '../models/producto.model';

export interface CargarProducto {
    totalPages: number;
    productos: Producto[];
}