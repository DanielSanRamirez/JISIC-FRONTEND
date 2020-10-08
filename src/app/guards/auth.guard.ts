import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { tap } from 'rxjs/operators';

// Importacion de servicios
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _usuarioServise: UsuarioService,
    private _router: Router
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this._usuarioServise.validarToken()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this._router.navigateByUrl('/login-admin');
            
          }
        })
      );
  }

}
