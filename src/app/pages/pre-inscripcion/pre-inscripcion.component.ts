import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { PreInscripcionService } from 'src/app/services/pre-inscripciones.service';

@Component({
  selector: 'app-pre-inscripcion',
  templateUrl: './pre-inscripcion.component.html',
  styles: [
  ]
})
export class PreInscripcionComponent implements OnInit {

  public cargando: boolean = true;
  public desde: number = 1;
  public totalInscripciones: number = 0;
  public inscripciones: Inscripcion[] = [];
  public inscripcionesTemp: Inscripcion[] = [];
  public element = [];

  constructor(
    private _preInscripcionService: PreInscripcionService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.cargarPreInscripcionesParticipantes();
  }

  cargarPreInscripcionesParticipantes() {
    this.cargando = true;
    this._preInscripcionService.cargarPreInscripcionesPaginado(this.desde).subscribe(
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

  cambiarPagina(valor) {

    if (this.desde === 1 && valor === 'restar') {
      this.desde = 1;

    } else if (this.desde === this.totalInscripciones && valor === 'sumar') {
      this.desde = this.totalInscripciones
    } else if (this.desde !== 1 && valor === 'restar') {
      this.desde -= 1;
    } else if (this.desde !== this.totalInscripciones && valor === 'sumar') {
      this.desde += 1;
    } else {
      this.desde = valor;
    }
    this.cargarPreInscripcionesParticipantes();
  }

}
