import { Component, OnInit } from '@angular/core';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { Pais } from 'src/app/models/pais.model';
import { Participante } from 'src/app/models/participante.model';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { InscritosService } from 'src/app/services/inscritos.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-inscritos',
  templateUrl: './inscritos.component.html',
  styles: [
  ]
})
export class InscritosComponent implements OnInit {

  public cargando: boolean = true;
  public desde: number = 1;
  public totalParticipantes: number = 0;
  public element = [];
  public participantes: any = [];
  public participantesTemp: Inscripcion[] = [];
  public paises: Pais[] = [];
  public dato: 'identificacion' | 'apellidos' | 'nombres' = 'identificacion';
  public tipo = 'inscritos'

  constructor(
    private _inscritosService: InscritosService,
    private _paisService: PaisService,
  ) { }

  ngOnInit(): void {

    this.cargarParticipanteInscrito()

  }

  cargarParticipanteInscrito() {

    this.cargando = true;
    this._inscritosService.cargarInscritos(this.desde).subscribe(
      ({ totalPages, participantes }) => {

        this._paisService.cargarPaises().subscribe(
          resp => {
            this.paises = resp;
            
            this.participantes.forEach(element => {
              
              this.paises.forEach(elementPais => {
                if (String(element.participante.codTelefono) === elementPais._id) {
                  element.participante.codTelefono = elementPais.phone_code;
                }
              });
            });
          }
        );

        this.totalParticipantes = totalPages;
        for (let index = 0; index < totalPages; index++) {
          this.element[index] = index + 1;
        }
        this.participantes = participantes;
        this.participantesTemp = participantes;
        this.cargando = false;
      }
    )
  }

  cambiarBusqueda(value) {
    this.dato = value.target.value;
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.participantes = this.participantesTemp;
    }

    this._inscritosService.buscar(this.dato, termino)
      .subscribe((resultados: Participante[]) => {
        this.participantes = resultados;
        this.participantes.forEach(element => {
              
          this.paises.forEach(elementPais => {
            if (String(element.codTelefono) === elementPais._id) {
              element.codTelefono = elementPais.phone_code;
            }
          });
        });
        
      }
      );
  }

  cambiarPagina(valor) {

    if (this.desde === 1 && valor === 'restar') {
      this.desde = 1;

    } else if (this.desde === this.totalParticipantes && valor === 'sumar') {
      this.desde = this.totalParticipantes
    } else if (this.desde !== 1 && valor === 'restar') {
      this.desde -= 1;
    } else if (this.desde !== this.totalParticipantes && valor === 'sumar') {
      this.desde += 1;
    } else {
      this.desde = valor;
    }
    this.cargarParticipanteInscrito();
  }

}
