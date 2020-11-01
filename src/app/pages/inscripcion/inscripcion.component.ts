import { Component, OnInit } from '@angular/core';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styles: [
  ]
})
export class InscripcionComponent implements OnInit {

  public cargando: boolean = true;
  public desde: number = 1;
  public totalInscripciones: number = 0;
  public element = [];
  public inscripciones: Inscripcion[] = [];
  public inscripcionesTemp: Inscripcion[] = [];

  constructor(
    private _pagoService: PagoService
  ) { }

  ngOnInit(): void {
   this.cargarPorPagar();
  }

  cargarPorPagar() {
    this.cargando = true;
    this._pagoService.cargarPagoPaginado(this.desde).subscribe(
      ({ totalPages, inscripciones }) => {

        this.totalInscripciones = totalPages;
        for (let index = 0; index < totalPages; index++) {
          this.element[index] = index + 1;
        }
        this.inscripciones = inscripciones;

        this.inscripcionesTemp = inscripciones;
        this.cargando = false;
      }
    )
  }

}
