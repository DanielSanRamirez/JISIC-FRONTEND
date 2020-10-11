import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Importar Interface
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

// Importación de interfaz
import { LoginForm } from '../interfaces/login-form.interface';

// Importación del modelo
import { Usuario } from '../models/usuario.model';

// Importar las variables de entorno globales
import { GLOBAL } from './global';

// Obtener la base de url
const base_url = GLOBAL.base_url;

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    public auth2: any;
    public usuario: Usuario;

    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _ngZone: NgZone
    ) { }

    get token() {
        return localStorage.getItem('token') || '';
    }

    get perfil(): 'USER_ADMIN' | 'USER_SECRE' | 'USER_TESO' {
        return this.usuario.perfil;
    }

    cargarUsuariosPaginado(desde: number = 0) {

        const url = `${base_url}/usuarios/pag?desde=${desde}`;

        return this._http.get<CargarUsuario>(url)
            .pipe(
                map(resp => {
                    const usuarios = resp.usuarios.map(
                        usuario => new Usuario(usuario.nombre, usuario.perfil, usuario.nombres, usuario.estado, '', usuario._id)
                    );
                    return {
                        total: resp.total,
                        usuarios
                    }
                })
            )
    }

    guardarLocalStorage(token: string, menu: any) {
        localStorage.setItem('token', token);
        localStorage.setItem('menu', JSON.stringify(menu));
    }

    validarToken(): Observable<boolean> {
        const token = this.token;

        return this._http.get(`${base_url}/login/renew`, {
            headers: {
                'x-token': token
            }
        }).pipe(
            map((resp: any) => {

                const { nombre, perfil, _id, nombres } = resp.usuario;

                this.usuario = new Usuario(
                    nombre, perfil, nombres, true, '', _id
                );
                this.guardarLocalStorage(resp.token, resp.menu);

                return true;
            }),
            catchError(error => of(false))
        );
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

    logout() {

        localStorage.removeItem('token');
        localStorage.removeItem('menu');
        this._router.navigateByUrl('/login-admin');

    }
}