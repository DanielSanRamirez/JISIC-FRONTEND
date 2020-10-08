import { Component, OnDestroy } from '@angular/core';

// Importación de la ruta
import { ActivationEnd, Router } from '@angular/router';

// Importación de subscripciones
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MenuService } from 'src/app/services/menu.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnDestroy {

  public titulo: string;
  public tituloSubs$: Subscription;
  public usuario: Usuario;

  constructor(
    private _router: Router,
    private _usuarioService: UsuarioService,
    public menuService: MenuService

  ) {
    this.tituloSubs$ = this.getArgumentosRuta()
      .subscribe(({ titulo }) => {
        this.titulo = titulo;
        document.title = `JISIC - ${titulo}`;
      });;
      this.menuService.cargarMenu();
      this.usuario = _usuarioService.usuario;
      
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  logout() {
    this._usuarioService.logout();
  }

  getArgumentosRuta() {
    return this._router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      )
  }

}
