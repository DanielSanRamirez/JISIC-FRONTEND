import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

// Importación de varibles globales
import { GLOBAL } from '../services/global'

// Importación del modelo
import { Producto } from '../models/producto.model';

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
    const url = `${ base_url }/productos`;

    return this._http.get(url).pipe(
      map( (resp: {ok: boolean, productos: Producto[]}) => resp.productos)
    );
  }

}