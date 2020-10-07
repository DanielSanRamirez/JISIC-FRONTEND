import { Component, OnDestroy } from '@angular/core';

// Importación de la ruta
import { ActivationEnd, Router } from '@angular/router';

// Importación de subscripciones
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnDestroy {

  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(
    private _router: Router
  ) {
    this.tituloSubs$ = this.getArgumentosRuta()
      .subscribe(({ titulo }) => {
        this.titulo = titulo;
        document.title = `JISIC - ${titulo}`;
      });;
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
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
