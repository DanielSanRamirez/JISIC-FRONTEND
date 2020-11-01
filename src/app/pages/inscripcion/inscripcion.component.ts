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
  public dato: 'numeroTransaccion' | 'identificacion' = 'numeroTransaccion';

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
    this._pagoService.aprobarPago(this.idPago, this.numeroFacturaValor)
      .subscribe(
        (resp: any) => {
          Swal.fire('Aprobado', `Participante ${this.inscripcion.participante.nombres} ${this.inscripcion.participante.apellidos} aprobado`, 'success');
          this.cargarPorPagar();
        },
        err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      )
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

  cambiarBusqueda(value) {
    this.dato = value.target.value;
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.pagos = this.pagosTemp;
    }

    this._pagoService.buscar(this.dato, termino)
      .subscribe((resultados: Pago[]) => {
        this.pagos = resultados;
        
      }
      );
  }

  cambiarPagina(valor) {

    if (this.desde === 1 && valor === 'restar') {
      this.desde = 1;

    } else if (this.desde === this.totalPagos && valor === 'sumar') {
      this.desde = this.totalPagos
    } else if (this.desde !== 1 && valor === 'restar') {
      this.desde -= 1;
    } else if (this.desde !== this.totalPagos && valor === 'sumar') {
      this.desde += 1;
    } else {
      this.desde = valor;
    }
    this.cargarPorPagar();
  }

}
