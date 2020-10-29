import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { Pais } from 'src/app/models/pais.model';
import { Participante } from 'src/app/models/participante.model';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { PaisService } from 'src/app/services/pais.service';
import { ParticipanteService } from 'src/app/services/participante.service';

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
  public participanteDatosFacturaForm1: FormGroup;
  public participanteDatosFacturaForm2: FormGroup;
  public paises: Pais[] = [];
  public participanteId: string;
  public participante: Participante;
  public cargando: boolean = true;
  public inscripciones: Inscripcion[] = [];
  public valorCheckboxs = true;

  constructor(
    private _translateService: TranslateService,
    private _fb: FormBuilder,
    private _paisService: PaisService,
    private _route: ActivatedRoute,
    private _participanteService: ParticipanteService,
    private _inscripcionService: InscripcionService
  ) {
    this.selectLanguage(this.selectedLanguages);
  }

  ngOnInit(): void {

    this._paisService.cargarPaises().subscribe(
      resp => {
        this.paises = resp;
      }
    );

    //obtendo el id de la ruta
    this.participanteId = this._route.snapshot.paramMap.get("id");

    this.obtenerDatosParticipante();

  }

  selectLanguage(lang: string) {
    this.selectedLanguages = lang;
    this._translateService.use(lang);
    this._translateService.get('FACTURA.STEP').subscribe(
      res => { this.step = res }

    );
  }

  datosParticipante() {

    /*this.infoParticipante = this.participanteForm.value;
    this.infoParticipante.tipoIdentificacion = this.identificacionForm.get('tipoIdentificacion').value;
    if (this.identificacionForm.get('tipoIdentificacion').value === '1') {
      this.infoParticipante.identificacion = this.identificacionForm.get('identificacion').value;
    } else {
      this.infoParticipante.identificacion = this.identificacionForm.get('pasaporte').value;
    }

    const { nombres, apellidos } = this.participanteForm.value;
    this._participanteService.crearParticipante(this.infoParticipante).subscribe(
      (resp: any) => {

        let participante = resp.participante.uid;

        this.arregloItemProducto.forEach((productos, index) => {
          let producto = productos.idProducto;

          let institucion = productos.participanteForm.institucion.value;

          let file = productos.file;

          let inscripcion = new Inscripcion(participante, producto, this.costoTotal, institucion);
          this._inscripcionService.crearInscripcion(inscripcion).subscribe(
            (resp: any) => {

              let idInscripcion = resp.inscripcion._id;
              if (file !== undefined) {
                this._fileUploadService.actualizarArchivo(file, 'participante', idInscripcion, nombres, apellidos);
              } else {
                console.log(this.tituloMensaje + this.textoMensaje1 + this.textoMensaje2);
                
                Swal.fire(this.tituloMensaje,
                  `${this.textoMensaje1} ${nombres} ${apellidos} ${this.textoMensaje2}`,
                  'success').then((result) => {
                    if (result.isConfirmed) {
                      this._router.navigateByUrl('/success');
                    }

                  });
              }

            }
          )
        });
      },
      err => {
        if (err.error.msg) {
          Swal.fire('Error', err.error.msg, 'error'); 
        } else {
          Swal.fire('Error', 'The email is not correct', 'error');
        }
        
      }
    )*/
  }

  obtenerDatosParticipante() {
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
      identificacion: [{ value: participante.identificacion, disabled: true }, Validators.required],
    });

  }

  obtenerInscripcionesParticipante(idParticipante: string) {

    this._inscripcionService.getInscripciones(idParticipante).subscribe(
      resp => {
        this.inscripciones = resp.inscripciones;
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
      identificacionDF: [{ value: participante.identificacion, disabled: true }, Validators.required],
    });
  }

  obtenerDatosFacturaForm2() {
    this.participanteDatosFacturaForm2 = this._fb.group({
      nombresDF: ['', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
      apellidosDF: ['', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
      direccionDF: ['', Validators.required],
      codTelefonoDF: ['', Validators.required],
      telefonoDF: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      emailDF: [''],
      paisDF: [''],
      tipoIdentificacionDF: ['', Validators.required],
      identificacionDF: ['']
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
      console.log(this.participanteDatosFacturaForm2);
      this.participanteDatosFacturaForm2 = this._fb.group({
        nombresDF: [this.participanteDatosFacturaForm2.value.nombresDF, [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        apellidosDF: [this.participanteDatosFacturaForm2.value.apellidosDF, [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        direccionDF: [this.participanteDatosFacturaForm2.value.direccionDF, Validators.required],
        codTelefonoDF: [this.participanteDatosFacturaForm2.value.codTelefonoDF, Validators.required],
        telefonoDF: [this.participanteDatosFacturaForm2.value.telefonoDF, [Validators.required, Validators.pattern('[0-9]*')]],
        emailDF: [this.participanteDatosFacturaForm2.value.emailDF],
        paisDF: [this.participanteDatosFacturaForm2.value.paisDF],
        tipoIdentificacionDF: [this.participanteDatosFacturaForm2.value.tipoIdentificacionDF, Validators.required],
        identificacionDF: [this.participanteDatosFacturaForm2.value.identificacionDF, Validators.required]
      });
      console.log(this.participanteDatosFacturaForm2);

    } else {
      console.log(this.participanteDatosFacturaForm2);
      this.participanteDatosFacturaForm2 = this._fb.group({
        nombresDF: [this.participanteDatosFacturaForm2.value.nombresDF, [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        apellidosDF: [this.participanteDatosFacturaForm2.value.apellidosDF, [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        direccionDF: [this.participanteDatosFacturaForm2.value.direccionDF, Validators.required],
        codTelefonoDF: [this.participanteDatosFacturaForm2.value.codTelefonoDF, Validators.required],
        telefonoDF: [this.participanteDatosFacturaForm2.value.telefonoDF, [Validators.required, Validators.pattern('[0-9]*')]],
        emailDF: [this.participanteDatosFacturaForm2.value.emailDF],
        paisDF: [this.participanteDatosFacturaForm2.value.paisDF],
        tipoIdentificacionDF: [this.participanteDatosFacturaForm2.value.tipoIdentificacionDF, Validators.required],
        identificacionDF: [this.participanteDatosFacturaForm2.value.identificacionDF]
      });
      console.log(this.participanteDatosFacturaForm2);
    }
  }
}