import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Importación de varibles globales
import { GLOBAL } from '../services/global'

// Importación del modelo
import { Pais } from '../models/pais.model';

// Definir varible global
const base_url = GLOBAL.base_url;

@Injectable({
    providedIn: 'root'
})
export class ParticipanteService {

    constructor(
        private _http: HttpClient,
        private _router: Router,
    ) { }

    crearParticipante(participante: {
        nombres: string,
        apellidos: string,
        direccion: string,
        codTelefono: Pais,
        telefono: string,
        email: string,
        pais: Pais
    }) {
        const url = `${base_url}/participantes`;

        return this._http.post(url, participante);
    }

    actualizarEstadoParticipante(_id: string) {

        const url = `${base_url}/participantes/estado/${ _id }`;
        const estado = true;
    
        return this._http.put(url, {estado});
          
      }

}