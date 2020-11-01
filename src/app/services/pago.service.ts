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
import { CargarPagos } from '../interfaces/cargar-pago-interface';
import { Inscripcion } from '../models/inscripcion.model';
import { CargarPago } from '../interfaces/cargar-pago-solo-interface';

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

    return this._http.get<CargarPagos>(url)
      .pipe(
        map(resp => {
          const pagos = resp.pagos.map(
            pago => new Pago(
              pago.nombres,
              pago.direccion,
              pago.codTelefono,
              pago.telefono,
              pago.tipoIdentificacion,
              pago.identificacion,
              pago.nombreBanco,
              pago.numeroTransaccion,
              pago.fechaTransaccion,
              pago.apellidos,
              pago._id
            )
          );
          return {
            totalPages: resp.totalPages,
            pagos
          }
        })
      )
  }

  crearEmail(idParticipante: string) {

    const url = `${base_url}/pagos/email-teso?id=${idParticipante}`;

    return this._http.get(url);
  }

  rechazarPago(mensaje: string, id: string) {
    return this._http.post(`${base_url}/pagos/rechazo/${id}`, { mensaje });
  }

  getPago(id: string) {
    const url = `${base_url}/pagos/pago?id=${id}`;

    return this._http.get<CargarPago>(url)
      .pipe(
        map(resp => {
          const pago = resp.pago;
          return {
            ok: resp.ok,
            pago
          }
        })
      )
  }

  aprobarPago(id: string, numeroFactura: string) {
    
    return this._http.post(`${base_url}/pagos/aceptado/${id}`, {numeroFactura});
  }

  private transformarPago(resultados: any[]): Pago[] {

    return resultados;
  }

  buscar(
    tipo: 'numeroTransaccion' | 'identificacion',
    termino: string
  ) {
    const url = `${base_url}/pagos/coleccion/${tipo}/${termino}`;

    return this._http.get<any[]>(url)
      .pipe(
        map((resp: any) => {
          return this.transformarPago(resp.resultados);
        })
      );
  }

}