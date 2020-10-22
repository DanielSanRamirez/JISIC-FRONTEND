import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map, tap } from 'rxjs/operators';

// Importación de varibles globales
import { GLOBAL } from '../services/global'

// Importación del modelo
import { Producto } from '../models/producto.model';

// Importación de interface
import { CargarProducto } from '../interfaces/cargar-productos.interface';

// Definir varible global
const base_url = GLOBAL.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) { }

  cargarProductos() {
    const url = `${base_url}/productos`;

    return this._http.get(url).pipe(
      map((resp: { ok: boolean, productos: Producto[] }) => resp.productos)
    );
  }

  cargarProductosPaginado(desde: number = 1) {

    const url = `${base_url}/productos/pag?desde=${desde}`;

    return this._http.get<CargarProducto>(url)
      .pipe(
        map(resp => {
          const productos = resp.productos.map(
            producto => new Producto(producto.nombre, producto.name, producto.costo, producto._id)
          );
          return {
            totalPages: resp.totalPages,
            productos
          }
        })
      )
  }

  crearProducto(producto: { nombre: string, name: string, costo: number }) {
    const url = `${base_url}/productos`;

    return this._http.post(url, producto);
  }

  private transformarProductos(resultados: any[]): Producto[] {

    return resultados;
  }

  buscar(
    termino: string
  ) {
    const url = `${base_url}/productos/coleccion/nombre/${termino}`;

    return this._http.get<any[]>(url)
      .pipe(
        map((resp: any) => {
          return this.transformarProductos(resp.resultados);
        })
      );
  }

  actualizarProducto(producto: { nombre: string, name: string, costo: number, id: string }) {

    return this._http.put(`${base_url}/productos/${producto.id}`, producto);

  }

  eliminarProducto(producto: { _id: string }) {

    const url = `${base_url}/productos/${producto._id}`;

    return this._http.delete(url);
  }

}