import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pais } from 'src/app/models/pais.model';
import { Participante } from 'src/app/models/participante.model';
import { PaisService } from 'src/app/services/pais.service';
import { PreRegistroService } from 'src/app/services/pre-registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pre-registro',
  templateUrl: './pre-registro.component.html',
  styles: [
  ]
})
export class PreRegistroComponent implements OnInit {

  public cargando: boolean = true;
  public desde: number = 1;
  public totalParticipantes: number = 0;
  public element = [];
  public participantes: Participante[] = [];
  public participantesTemp: Participante[] = [];
  public dato: 'identificacion' | 'apellidos' | 'nombres' = 'identificacion';
  public participanteForm: FormGroup;
  public paises: Pais[] = [];

  constructor(
    private _preRegistroService: PreRegistroService,
    private _fb: FormBuilder,
    private _paisService: PaisService
  ) { }

  ngOnInit(): void {

    this.cargarParticipanteResgistrados();

    this.participanteFormGroup();

    this._paisService.cargarPaises().subscribe(
      resp => {
        this.paises = resp;
      }
    );
  }

  cargarParticipanteResgistrados() {
    this.cargando = true;
    this._preRegistroService.cargarParticipantesPreRegistroPaginado(this.desde).subscribe(
      ({ totalPages, participantes }) => {
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
    this.cargarParticipanteResgistrados();
  }

  cambiarBusqueda(value) {
    this.dato = value.target.value;
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.participantes = this.participantesTemp;
    }

    this._preRegistroService.buscar(this.dato, termino)
      .subscribe((resultados: Participante[]) => {
        this.participantes = resultados;
      }
      );
  }

  limpiarDatos() {
    this.participanteFormGroup();
  }

  participanteFormGroup() {
    this.participanteForm = this._fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      codTelefono: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      pais: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
    });
  }

  actualizardatosParticipante() {

    this._preRegistroService.actualizarParticipante(this.participanteForm.value)
      .subscribe(
        (resp: any) => {
          Swal.fire('Actualizado', `Participante ${this.participanteForm.value.nombres} ${this.participanteForm.value.apellidos} actualizado correctamente`, 'success');
          this.cargarParticipanteResgistrados();
        },
        err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      )

  }

  obtenerParticipante(participante) {
    this.participanteForm = this._fb.group({
      nombres: [participante.nombres, Validators.required],
      apellidos: [participante.apellidos, Validators.required],
      direccion: [participante.direccion, Validators.required],
      codTelefono: [participante.codTelefono, Validators.required],
      telefono: [participante.telefono, Validators.required],
      email: [participante.email, Validators.required],
      pais: [participante.pais, Validators.required],
      tipoIdentificacion: [participante.tipoIdentificacion, Validators.required],
      identificacion: [participante.identificacion, Validators.required],
      id: [participante.uid]
    });
  }

  eliminarParticipante(participante) {
    Swal.fire({
      title: '¿Borrar participante?',
      text: `Esta a punto de borrar el participante ${participante.nombres} ${participante.apellidos}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {

        this._preRegistroService.eliminarParticipante(participante)
          .subscribe(
            resp => {
              this.cargarParticipanteResgistrados();
              Swal.fire('Participante borrado', `${participante.nombres} ${participante.apellidos} fue eliminado correctamente`, 'success')
            }
          );
      }
    })
  }

}
