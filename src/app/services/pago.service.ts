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
            datosFactura.apellidosDF,
            datosFactura.direccionDF,
            datosFactura.codTelefonoDF,
            datosFactura.telefonoDF,
            datosFactura.tipoIdentificacionDF,
            datosFactura.identificacionDF,
            datosPago.nombreBanco,
            datosPago.numeroTransaccion,
            datosPago.fechaTransaccion
        )
        
        return this._http.post(url, pago);
    }

    /*actualizarEstadoParticipante(_id: string) {

        const url = `${base_url}/participantes/estado/${_id}`;
        const estado = true;

        return this._http.put(url, { estado });

    }*/

    /*obtenerParticipante(id: string) {
        const url = `${base_url}/participantes/participante?id=${id}`;

        return this._http.get<CargarParticipanteSolo>(url).pipe(
            map(resp => {
                const participante = resp.participante;
                return {
                    ok: resp.ok,
                    participante
                }
            })
        )
    }*/

}