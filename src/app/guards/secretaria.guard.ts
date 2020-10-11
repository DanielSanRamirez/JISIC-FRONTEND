import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SecretariaGuard implements CanActivate {
  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this._usuarioService.perfil !== 'USER_TESO') {
      return true;
    } else {
      this._router.navigateByUrl('/admin/dashboard');
      return false;
    }
  }
  
}
