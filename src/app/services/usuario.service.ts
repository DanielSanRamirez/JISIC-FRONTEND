import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

// Importación de interfaz
import { LoginForm } from '../interfaces/login-form.interface';

// Importar las variables de entorno globales
import { GLOBAL } from './global';

// Obtener la base de url
const base_url = GLOBAL.base_url;

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(
        private _http: HttpClient,
    ) { }

    guardarLocalStorage(token: string, menu: any) {
        localStorage.setItem('token', token);
        localStorage.setItem('menu', JSON.stringify(menu));
    }

    login(formData: LoginForm) {
        return this._http.post(`${base_url}/login`, formData)
            .pipe(
                tap(
                    (resp: any) => {
                        this.guardarLocalStorage(resp.token, resp.menu);
                    }
                )
            );
    }
}