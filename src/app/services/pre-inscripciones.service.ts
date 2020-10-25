import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map, tap } from 'rxjs/operators';

// Importación de varibles globales
import { GLOBAL } from './global'

// Importación del modelo
import { Participante } from '../models/participante.model';

// Importación de interface
import { CargarPreInscripcion } from '../interfaces/cargar-pre-inscripcion.interface';
import { Inscripcion } from '../models/inscripcion.model';

// Definir varible global
const base_url = GLOBAL.base_url;

@Injectable({
  providedIn: 'root'
})
export class PreInscripcionService {

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) { }

  cargarPreInscripcionesPaginado(desde: number = 1) {

    const url = `${base_url}/pre-inscripcion?desde=${desde}`;

    return this._http.get<CargarPreInscripcion>(url)
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
              inscripcion._id
            )
          );
          return {
            totalPages: resp.totalPages,
            inscripciones
          }
        })
      )
  }

  /*private transformarParticipantes(resultados: any[]): Participante[] {

    return resultados;
  }

  buscar(
    tipo: 'identificacion' | 'participante',
    termino: string
  ) {
    const url = `${base_url}/pre-registro/coleccion/${tipo}/${termino}`;

    return this._http.get<any[]>(url)
      .pipe(
        map((resp: any) => {
          return this.transformarParticipantes(resp.resultados);
        })
      );
  }

  actualizarParticipante(participante: { nombres: string, apellidos: string, direccion: string, codTelefono: string, telefono: string, email: string, pais: string, tipoIdentificacion: string, identificacion: string, id: string }) {

    return this._http.put(`${base_url}/pre-registro/${participante.id}`, participante);

  }

  eliminarParticipante(producto: { uid: string }) {

    const url = `${base_url}/pre-registro/${producto.uid}`;

    return this._http.delete(url);
  }*/

}