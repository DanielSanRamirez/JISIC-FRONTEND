import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Importación de varibles globales
import { GLOBAL } from '../services/global'
import { Participante } from '../models/participante.model';
import { Producto } from '../models/producto.model';

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

}