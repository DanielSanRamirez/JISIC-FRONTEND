import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { Pago } from 'src/app/models/pago.model';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { PagoService } from 'src/app/services/pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styles: [
  ]
})
export class InscripcionComponent implements OnInit {

  public cargando: boolean = true;
  public desde: number = 1;
  public totalPagos: number = 0;
  public element = [];
  public pagos: Pago[] = [];
  public pagosTemp: Pago[] = [];
  public inscripcion: Inscripcion;
  public cargandoModal: boolean = true;
  public isChecked = false;
  public numeroFacturaValor = '';
  public mensajeValor = '';
  public idPago;

  constructor(
    private _pagoService: PagoService,
    private _inscripcionService: InscripcionService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.cargarPorPagar();
  }

  cargarPorPagar() {
    this.cargando = true;
    this._pagoService.cargarPagoPaginado(this.desde).subscribe(
      ({ totalPages, pagos }) => {

        this.totalPagos = totalPages;
        for (let index = 0; index < totalPages; index++) {
          this.element[index] = index + 1;
        }
        this.pagos = pagos;

        this.pagosTemp = pagos;
        this.cargando = false;
      }
    )
  }

  obtenerParticipante(idPago) {
    this.cargandoModal = true;
    this.idPago = idPago;
    this._inscripcionService.getInscripcionPorPago(idPago).subscribe(
      resp => {
        this.inscripcion = resp.inscripcion;
        this.cargandoModal = false
      }
    )
  }

  limpiarDatos() {
    this.isChecked = false;
  }

  cambioCheck(event) {
    this.isChecked = event.target.checked;
  }

  aprobarPreInscripcion() {
    /*this._preInscripcionService.aprobarPreInscripcion(this.preInscripcionForm.value.id)
      .subscribe(
        (resp: any) => {
          Swal.fire('Aprobado', `Participante ${this.preInscripcionForm.value.nombres} ${this.preInscripcionForm.value.apellidos} aprobado`, 'success');
          this.cargarPreInscripcionesParticipantes();
        },
        err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      )
*/
  }

  rechazarPago() {
    this._pagoService.rechazarPago(this.mensajeValor, this.idPago)
      .subscribe(
        (resp: any) => {
          Swal.fire('Rechazado', `Participante ${this.inscripcion.participante.nombres} ${this.inscripcion.participante.apellidos} rechazado su pago`, 'success');
          this.cargarPorPagar();
        },
        err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      )
  }

  numeroFactura(txtTermino) {
    this.numeroFacturaValor = txtTermino;
  }

  mensaje(txtTermino) {
    this.mensajeValor = txtTermino;
  }

}
