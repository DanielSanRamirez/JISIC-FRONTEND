import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map, tap } from 'rxjs/operators';

// Importación de varibles globales
import { GLOBAL } from './global'

// Importación del modelo
import { Participante } from '../models/participante.model';

// Importación de interface
import { CargarParticipante } from '../interfaces/cargar-participantes.interface';

// Definir varible global
const base_url = GLOBAL.base_url;

@Injectable({
  providedIn: 'root'
})
export class PreRegistroService {

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) { }

  cargarParticipantesPreRegistroPaginado(desde: number = 1) {

    const url = `${base_url}/pre-registro?desde=${desde}`;

    return this._http.get<CargarParticipante>(url)
      .pipe(
        map(resp => {
          const participantes = resp.participantes.map(
            participante => new Participante(
              participante.nombres,
              participante.apellidos,
              participante.direccion,
              participante.codTelefono,
              participante.telefono,
              participante.email,
              participante.pais,
              participante.tipoIdentificacion,
              participante.identificacion,
              participante.uid
            )
          );
          return {
            totalPages: resp.totalPages,
            participantes
          }
        })
      )
  }

  private transformarParticipantes(resultados: any[]): Participante[] {

    return resultados;
  }

  buscar(
    tipo: 'identificacion' | 'apellidos' | 'nombres',
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
  }

}