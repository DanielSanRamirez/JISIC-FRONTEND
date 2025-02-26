import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map, tap } from 'rxjs/operators';

// Importación de varibles globales
import { GLOBAL } from './global'

// Importación del modelo
import { Inscripcion } from '../models/inscripcion.model';

// Importación de interface
import { CargarPorPagar } from '../interfaces/cargar-por-pagar.interface';

// Definir varible global
const base_url = GLOBAL.base_url;

@Injectable({
  providedIn: 'root'
})
export class PorPagarService {

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) { }

  cargarPorPagarPaginado(desde: number = 1) {

    const url = `${base_url}/por-pagar?desde=${desde}`;

    return this._http.get<CargarPorPagar>(url)
      .pipe(
        map(resp => {
          const inscripciones = resp.inscripciones.map(
            inscripcion => new Inscripcion(
              inscripcion.participante,
              inscripcion.producto,
              inscripcion.costoTotal,
              inscripcion.institucion,
              inscripcion.img,
              inscripcion.estado,
              inscripcion._id,
              inscripcion.estadoParticipante,
              inscripcion.estadoRecibo,
              inscripcion.pago
            )
          );
          return {
            totalPages: resp.totalPages,
            inscripciones
          }
        })
      )
  }

  private transformarInscripcion(resultados: any[]): Inscripcion[] {

    return resultados;
  }

  buscar(
    tipo: 'identificacion' | 'apellidos' | 'nombres',
    termino: string
  ) {
    const url = `${base_url}/por-pagar/coleccion/${tipo}/${termino}`;

    return this._http.get<any[]>(url)
      .pipe(
        map((resp: any) => {
          return this.transformarInscripcion(resp.resultados);
        })
      );
  }

  /*actualizarParticipante(participante: { nombres: string, apellidos: string, direccion: string, codTelefono: string, telefono: string, email: string, pais: string, tipoIdentificacion: string, identificacion: string, id: string }) {

    return this._http.put(`${base_url}/pre-registro/${participante.id}`, participante);

  }*/

  /*eliminarParticipante(producto: { uid: string }) {

    const url = `${base_url}/pre-registro/${producto.uid}`;

    return this._http.delete(url);
  }*/

}