import { Component, OnInit } from '@angular/core';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { PorPagarService } from 'src/app/services/por-pagar.service';

@Component({
  selector: 'app-por-pagar',
  templateUrl: './por-pagar.component.html',
  styles: [
  ]
})
export class PorPagarComponent implements OnInit {

  public cargando: boolean = true;
  public inscripciones: Inscripcion[] = [];
  public desde: number = 1;
  public totalInscripciones: number = 0;
  public element = [];
  public inscripcionesTemp: Inscripcion[] = [];
  public dato: 'identificacion' | 'apellidos' | 'nombres' = 'identificacion';

  constructor(
    private _porPagarService: PorPagarService
  ) { }

  ngOnInit(): void {
    this.cargarPorPagar();
  }

  cargarPorPagar() {
    this.cargando = true;
    this._porPagarService.cargarPorPagarPaginado(this.desde).subscribe(
      ({ totalPages, inscripciones }) => {

        this.totalInscripciones = totalPages;
        for (let index = 0; index < totalPages; index++) {
          this.element[index] = index + 1;
        }
        this.inscripciones = inscripciones;
        console.log(this.inscripciones);

        this.inscripcionesTemp = inscripciones;
        this.cargando = false;
      }
    )
  }

  cambiarBusqueda(value) {
    this.dato = value.target.value;
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.inscripciones = this.inscripcionesTemp;
    }

    this._porPagarService.buscar(this.dato, termino)
      .subscribe((resultados: Inscripcion[]) => {
        this.inscripciones = resultados;
      }
      );
  }

}
