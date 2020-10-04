import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

// Importación de varibles globales
import { GLOBAL } from '../services/global'

// Importación del modelo
import { Pais } from '../models/pais.model';

// Definir varible global
const base_url = GLOBAL.base_url;

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) { }

  cargarPaises() {
    const url = `${ base_url }/paises`;

    return this._http.get(url).pipe(
      map( (resp: {ok: boolean, paises: Pais[]}) => resp.paises)
    );
  }

}
