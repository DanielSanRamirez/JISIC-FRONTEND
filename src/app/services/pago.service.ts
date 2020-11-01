import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Importación de varibles globales
import { GLOBAL } from '../services/global'

// Importación del modelo
import { Pais } from '../models/pais.model';
import { Pago } from '../models/pago.model';
import { map } from 'rxjs/operators';
import { CargarParticipanteSolo } from '../interfaces/cargar-participante.interface';
import { CargarPago } from '../interfaces/cargar-pago-interface';
import { Inscripcion } from '../models/inscripcion.model';

// Definir varible global
const base_url = GLOBAL.base_url;

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) { }

  crearParticipante(datosFactura: {
    nombresDF: string,
    apellidosDF: string,
    direccionDF: string,
    codTelefonoDF: Pais,
    telefonoDF: string,
    tipoIdentificacionDF: string,
    identificacionDF: string
  }, datosPago: {
    nombreBanco: string,
    numeroTransaccion: number,
    fechaTransaccion: any
  }, idParticipante: string) {
    const url = `${base_url}/pagos?id=${idParticipante}`;
    const pago = new Pago(
      datosFactura.nombresDF,
      datosFactura.direccionDF,
      datosFactura.codTelefonoDF,
      datosFactura.telefonoDF,
      datosFactura.tipoIdentificacionDF,
      datosFactura.identificacionDF,
      datosPago.nombreBanco,
      datosPago.numeroTransaccion,
      datosPago.fechaTransaccion,
      datosFactura.apellidosDF,
    )

    return this._http.post(url, pago);
  }

  cargarPagoPaginado(desde: number = 1) {

    const url = `${base_url}/pagos?desde=${desde}`;

    return this._http.get<CargarPago>(url)
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

  crearEmail(idParticipante: string) {
    
    const url = `${base_url}/pagos/email-teso?id=${idParticipante}`;

    return this._http.get(url);
  }

}