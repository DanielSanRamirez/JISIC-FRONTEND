import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { Pais } from 'src/app/models/pais.model';
import { Participante } from 'src/app/models/participante.model';
import { CampoValidoService } from 'src/app/services/campoValido.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { PagoService } from 'src/app/services/pago.service';
import { PaisService } from 'src/app/services/pais.service';
import { ParticipanteService } from 'src/app/services/participante.service';
import { cedulaIdentidad } from 'src/app/validaciones/cedula-identidad.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-factura',
  templateUrl: './datos-factura.component.html',
  styles: [
  ]
})
export class DatosFacturaComponent implements OnInit {

  public selectedLanguages = 'formulario-en';
  public step = [];
  public participanteForm: FormGroup;
  public payForm: FormGroup;
  public participanteDatosFacturaForm1: FormGroup;
  public participanteDatosFacturaForm2: FormGroup;
  public paises: Pais[] = [];
  public participanteId: string;
  public participante: Participante;
  public cargando: boolean = true;
  public inscripciones: Inscripcion[] = [];
  public valorCheckboxs = true;
  public fechaActual = new Date();
  public limiteFecha: string;
  public imagenSubir: File;
  public imagenValida: Boolean = false;
  public mostrarErrorArchivo: Boolean = false;
  public datosParaFactura;
  public estadoRecibo = false;
  public dia = '';

  constructor(
    private _translateService: TranslateService,
    private _fb: FormBuilder,
    private _paisService: PaisService,
    private _route: ActivatedRoute,
    private _participanteService: ParticipanteService,
    private _inscripcionService: InscripcionService,
    private _campoValidoService: CampoValidoService,
    private _pagoService: PagoService,
    private _fileUploadService: FileUploadService,
    private _router: Router,
  ) {
    this.selectLanguage(this.selectedLanguages);
  }

  ngOnInit(): void {

    if (this.fechaActual.getDate() < 10) {
      this.dia = `0${this.fechaActual.getDate()}`
    } else {
      this.dia = String(this.fechaActual.getDate());
    }

    this.limiteFecha = `${this.fechaActual.getFullYear()}-${this.fechaActual.getMonth() + 1}-${this.dia}`;

    this._paisService.cargarPaises().subscribe(
      resp => {
        this.paises = resp;
      }
    );

    //obtendo el id de la ruta
    this.participanteId = this._route.snapshot.paramMap.get("id");
    
    this.payForm = this._fb.group({
      nombreBanco: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9À-ÿ\u00f1\u00d1 ]*')]],
      numeroTransaccion: ['', [Validators.required, Validators.min(0)]],
      fechaTransaccion: [this.limiteFecha, Validators.required]
    });

    this.obtenerDatosParticipante();
    
  }

  selectLanguage(lang: string) {
    this.selectedLanguages = lang;
    this._translateService.use(lang);
    this._translateService.get('FACTURA.STEP').subscribe(
      res => { this.step = res }

    );
  }

  datosPago() {

    if (this.valorCheckboxs) {
      this.datosParaFactura = this.participanteDatosFacturaForm1.value;
    } else {
      this.datosParaFactura = this.participanteDatosFacturaForm2.value;
    }

    this._pagoService.crearParticipante(this.datosParaFactura, this.payForm.value, this.participanteId).subscribe(
      (resp: any) => {

        this._fileUploadService.actualizarArchivo(this.imagenSubir, 'factura', resp.pago._id).then(
          resp => {
            this._pagoService.crearEmail(this.participanteId).subscribe(
              resp => console.log()   
            )
            if (!resp) {
              Swal.fire('Error',
                `${resp}`,
                'error').then((result) => {
                  if (result.isConfirmed) {
                    this._router.navigateByUrl('/success-pay');
                  }

                })
            } else {

              Swal.fire('Creado',
                `Registro de pago con exito`,
                'success').then((result) => {
                  if (result.isConfirmed) {
                    this._router.navigateByUrl('/success-pay');
                  }

                })
            }
          }
        );
      },
      (err: any) => {
        Swal.fire('Error',
          `${err.error.msg}`,
          'error')
      }
    );

  }

  obtenerDatosParticipante() {
    console.log('Entro');
    
    this.cargando = true;
    this._participanteService.obtenerParticipante(this.participanteId).subscribe(
      resp => {
        this.participante = resp.participante
        this.cargando = false;
        this.obtenerParticipanteForm(this.participante);
        this.obtenerInscripcionesParticipante(this.participante.uid);
        this.obtenerDatosFacturaForm1(this.participante);
        this.obtenerDatosFacturaForm2();
      }
    )
  }

  obtenerParticipanteForm(participante) {

    this.participanteForm = this._fb.group({
      nombres: [{ value: participante.nombres, disabled: true }, [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
      apellidos: [{ value: participante.apellidos, disabled: true }, [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
      direccion: [{ value: participante.direccion, disabled: true }, Validators.required],
      codTelefono: [{ value: participante.codTelefono, disabled: true }, Validators.required],
      telefono: [{ value: participante.telefono, disabled: true }, [Validators.required, Validators.pattern('[0-9]*')]],
      email: [{ value: participante.email, disabled: true }, [Validators.required, Validators.email]],
      pais: [{ value: participante.pais, disabled: true }, Validators.required],
      tipoIdentificacion: [{ value: participante.tipoIdentificacion, disabled: true }, Validators.required],
      identificacion: [{ value: participante.identificacion, disabled: true }, Validators.required]
    });

  }

  obtenerInscripcionesParticipante(idParticipante: string) {

    this._inscripcionService.getInscripciones(idParticipante).subscribe(
      resp => {
        this.inscripciones = resp.inscripciones;
        this.inscripciones.forEach(element => {
          if (element.estadoRecibo === true) {
            this.estadoRecibo = true;
          }
        });
      }
    )
  }

  obtenerDatosFacturaForm1(participante) {
    this.participanteDatosFacturaForm1 = this._fb.group({
      nombresDF: [{ value: participante.nombres, disabled: true }, [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
      apellidosDF: [{ value: participante.apellidos, disabled: true }, [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
      direccionDF: [{ value: participante.direccion, disabled: true }, Validators.required],
      codTelefonoDF: [{ value: participante.codTelefono, disabled: true }, Validators.required],
      telefonoDF: [{ value: participante.telefono, disabled: true }, [Validators.required, Validators.pattern('[0-9]*')]],
      emailDF: [{ value: participante.email, disabled: true }],
      paisDF: [{ value: participante.pais, disabled: true }],
      tipoIdentificacionDF: [{ value: participante.tipoIdentificacion, disabled: true }, Validators.required],
      identificacionDF: [{ value: participante.identificacion, disabled: true }, Validators.required]
    });
  }

  obtenerDatosFacturaForm2() {
    this.participanteDatosFacturaForm2 = this._fb.group({
      nombresDF: ['', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
      apellidosDF: ['', [ Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
      direccionDF: ['', Validators.required],
      codTelefonoDF: ['', Validators.required],
      telefonoDF: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      emailDF: [''],
      paisDF: [''],
      tipoIdentificacionDF: ['', Validators.required],
      identificacionDF: [''],
      idParticipante: [this.participanteId, Validators.required]
    });
  }

  cambioCheckBox(event) {
    this.valorCheckboxs = event.target.checked;
    if (event.target.checked) {
      this.obtenerDatosFacturaForm1(this.participante);
    } else {
      this.obtenerDatosFacturaForm2();
    }

  }

  cambioTipoIdentificacion(evento) {
    if (evento === '1') {
      this.participanteDatosFacturaForm2.value.identificacionDF = '';
      this.participanteDatosFacturaForm2 = this._fb.group({
        nombresDF: [this.participanteDatosFacturaForm2.value.nombresDF, [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        apellidosDF: [this.participanteDatosFacturaForm2.value.apellidosDF, [Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        direccionDF: [this.participanteDatosFacturaForm2.value.direccionDF, Validators.required],
        codTelefonoDF: [this.participanteDatosFacturaForm2.value.codTelefonoDF, Validators.required],
        telefonoDF: [this.participanteDatosFacturaForm2.value.telefonoDF, [Validators.required, Validators.pattern('[0-9]*')]],
        emailDF: [this.participanteDatosFacturaForm2.value.emailDF],
        paisDF: [this.participanteDatosFacturaForm2.value.paisDF],
        tipoIdentificacionDF: [this.participanteDatosFacturaForm2.value.tipoIdentificacionDF, Validators.required],
        identificacionDF: [this.participanteDatosFacturaForm2.value.identificacionDF, [Validators.required, Validators.pattern('[0-9]*'), cedulaIdentidad()]],
        idParticipante: [this.participanteId, Validators.required]
      });

    } else {
      this.participanteDatosFacturaForm2.value.identificacionDF = '';
      this.participanteDatosFacturaForm2 = this._fb.group({
        nombresDF: [this.participanteDatosFacturaForm2.value.nombresDF, [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        apellidosDF: [this.participanteDatosFacturaForm2.value.apellidosDF, [Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        direccionDF: [this.participanteDatosFacturaForm2.value.direccionDF, Validators.required],
        codTelefonoDF: [this.participanteDatosFacturaForm2.value.codTelefonoDF, Validators.required],
        telefonoDF: [this.participanteDatosFacturaForm2.value.telefonoDF, [Validators.required, Validators.pattern('[0-9]*')]],
        emailDF: [this.participanteDatosFacturaForm2.value.emailDF],
        paisDF: [this.participanteDatosFacturaForm2.value.paisDF],
        tipoIdentificacionDF: [this.participanteDatosFacturaForm2.value.tipoIdentificacionDF, Validators.required],
        identificacionDF: [this.participanteDatosFacturaForm2.value.identificacionDF, [Validators.pattern('[0-9]*'), Validators.required]],
        idParticipante: [this.participanteId, Validators.required]
      });
    }
  }

  campoNoValido(campo) {
    let valor = this._campoValidoService.campoNoValido(campo, this.participanteDatosFacturaForm2);
    return valor;
  }

  campoNoValidoPay(campo) {
    let valor = this._campoValidoService.campoNoValido(campo, this.payForm);
    return valor;
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!this.imagenSubir) {
      this.imagenValida = false;
      this.mostrarErrorArchivo = true;
      return;
    }

    if (this.imagenSubir.type === 'image/png' || this.imagenSubir.type === 'image/jpeg') {
      this.imagenValida = true;
    } else {
      this.imagenValida = false;
      this.mostrarErrorArchivo = true;
    }
  }

}
