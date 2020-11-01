import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PreInscripcionService } from 'src/app/services/pre-inscripciones.service';
import Swal from 'sweetalert2';

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
  public dato: 'identificacion' | 'apellidos' | 'nombres' = 'identificacion';
  public preInscripcionForm: FormGroup;
  public isChecked = false;
  public inscripcion: Inscripcion;

  constructor(
    private _preInscripcionService: PreInscripcionService,
    private _fb: FormBuilder,
    private _fileUploadService: FileUploadService,
  ) {
  }

  ngOnInit(): void {

    this.cargarPreInscripcionesParticipantes();

    this.participanteFormGroup();
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

  cambiarBusqueda(value) {
    this.dato = value.target.value;
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.inscripciones = this.inscripcionesTemp;
    }

    this._preInscripcionService.buscar(this.dato, termino)
      .subscribe((resultados: Inscripcion[]) => {
        this.inscripciones = resultados;
      }
      );
  }

  limpiarDatos() {
    this.participanteFormGroup();
  }

  participanteFormGroup() {
    this.preInscripcionForm = this._fb.group({
      nombreProducto: ['', Validators.required],
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      identificacion: ['', Validators.required],
      institucion: ['', Validators.required],
      img: ['', Validators.required],
    });
  }

  actualizardatosParticipante() {

    /*this._preRegistroService.actualizarParticipante(this.participanteForm.value)
      .subscribe(
        (resp: any) => {
          Swal.fire('Actualizado', `Participante ${this.participanteForm.value.nombres} ${this.participanteForm.value.apellidos} actualizado correctamente`, 'success');
          this.cargarParticipanteResgistrados();
        },
        err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      )*/

  }

  obtenerParticipante(inscripcion) {
    this.preInscripcionForm = this._fb.group({
      nombreProducto: [inscripcion.producto.nombre, Validators.required],
      apellidos: [inscripcion.participante.apellidos, Validators.required],
      nombres: [inscripcion.participante.nombres, Validators.required],
      identificacion: [inscripcion.participante.identificacion, Validators.required],
      institucion: [inscripcion.institucion, Validators.required],
      img: [inscripcion.img, Validators.required],
      mensaje: [''],
      id: [inscripcion._id]
    });
  }

  cambioCheck(event) {
    this.isChecked = event.target.checked;
  }

  downloadImagen(img) {
    this._fileUploadService.downloadImagen('participante', img);
  }

  aprobarPreInscripcion() {
    this._preInscripcionService.aprobarPreInscripcion(this.preInscripcionForm.value.id)
      .subscribe(
        (resp: any) => {
          Swal.fire('Aprobado', `Participante ${this.preInscripcionForm.value.nombres} ${this.preInscripcionForm.value.apellidos} aprobado`, 'success');
          this.cargarPreInscripcionesParticipantes();
        },
        err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      )

  }

  rechazarPreInscripcion() {
    this._preInscripcionService.rechazarPreInscripcion(this.preInscripcionForm.value.mensaje, this.preInscripcionForm.value.id)
      .subscribe(
        (resp: any) => {
          Swal.fire('Rechazado', `Participante ${this.preInscripcionForm.value.nombres} ${this.preInscripcionForm.value.apellidos} rechazado`, 'success');
          this.cargarPreInscripcionesParticipantes();
        },
        err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      )
  }
}
