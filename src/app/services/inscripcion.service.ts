import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Importación de varibles globales
import { GLOBAL } from '../services/global'
import { Participante } from '../models/participante.model';
import { Producto } from '../models/producto.model';
import { Inscripcion } from '../models/inscripcion.model';
import { CargarInscripcion } from '../interfaces/cargar-inscripcion.interface';
import { map } from 'rxjs/operators';
import { CargarInscripciones } from '../interfaces/cargar-inscripciones.interface';

// Importación del modelo


// Definir varible global
const base_url = GLOBAL.base_url;

@Injectable({
    providedIn: 'root'
})
export class InscripcionService {

    constructor(
        private _http: HttpClient,
        private _router: Router,
    ) { }

    crearInscripcion(inscripcion: {
        institucion?: string,
        participante: Participante,
        producto: Producto,
        costoTotal: number
    }) {
        const url = `${base_url}/inscripciones`;

        return this._http.post(url, inscripcion);
    }

    getInscripcion(id: string) {
        const url = `${base_url}/inscripciones/inscripcion?id=${id}`;

        return this._http.get<CargarInscripcion>(url)
            .pipe(
                map(resp => {
                    const inscripcion = resp.inscripcion;
                    return {
                        ok: resp.ok,
                        inscripcion
                    }
                })
            )
    }

    getInscripcionPorPago(id: string) {
        const url = `${base_url}/inscripciones/inscripcion/pago?id=${id}`;

        return this._http.get<CargarInscripcion>(url)
            .pipe(
                map(resp => {
                    const inscripcion = resp.inscripcion;
                    return {
                        ok: resp.ok,
                        inscripcion
                    }
                })
            )
    }

    getInscripciones(id: string) {
        const url = `${base_url}/inscripciones/inscripciones?id=${id}`;

        return this._http.get<CargarInscripciones>(url)
            .pipe(
                map(resp => {
                    const inscripciones = resp.inscripciones;
                    return {
                        ok: resp.ok,
                        inscripciones
                    }
                })
            )
    }

}