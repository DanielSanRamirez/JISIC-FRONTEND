import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

// Importar popup
import Swal from 'sweetalert2';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

// Importación del modelo
import { Pais } from 'src/app/models/pais.model';
import { Participante } from 'src/app/models/participante.model';
import { Producto } from 'src/app/models/producto.model';

// Importación de servicios
import { TranslateService } from '@ngx-translate/core';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';
import { CampoValidoService } from 'src/app/services/campoValido.service';
import { ParticipanteService } from 'src/app/services/participante.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { identifierModuleUrl } from '@angular/compiler';
import { FileUploadService } from 'src/app/services/file-upload.service';

// Importación para rutas
import { Router } from '@angular/router';

// Importar directiva de validación
import { cedulaIdentidad } from 'src/app/validaciones/cedula-identidad.directive';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: [
  ]
})
export class FormularioComponent implements OnInit, AfterViewInit {

  public participanteForm: FormGroup;
  public identificacionForm: FormGroup;
  public inscripcionForm = [];
  public selectedLanguages = 'formulario-en';
  public step = [];
  public paises: Pais[] = [];
  public productos: Producto[] = [];
  public infoParticipante: Participante;
  public costoTotal: number = 0;
  public arregloItemProducto = [];
  public arregloProductoCopia = [];
  public tituloMensaje;
  public textoMensaje1;
  public textoMensaje2;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private _translateService: TranslateService,
    private _fb: FormBuilder,
    private _paisService: PaisService,
    private _productoService: ProductoService,
    private _campoValidoService: CampoValidoService,
    private _participanteService: ParticipanteService,
    private _inscripcionService: InscripcionService,
    private _fileUploadService: FileUploadService,
    private _router: Router,

  ) {
    this.selectLanguage(this.selectedLanguages);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.stepper.selectedIndex = 0;
    });

  }

  ngOnInit(): void {
    this._paisService.cargarPaises().subscribe(
      resp => {
        this.paises = resp;
      }
    );

    this._productoService.cargarProductos().subscribe(
      resp => {
        this.productos = resp;
      }
    );

    this.participanteForm = this._fb.group({
      nombres: ['', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
      apellidos: ['', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
      direccion: ['', Validators.required],
      codTelefono: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      pais: ['', Validators.required],
    });

    this.identificacionForm = this._fb.group({
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', [Validators.pattern('[0-9]*'), cedulaIdentidad()]],
      pasaporte: ['', [Validators.pattern('[a-zA-Z0-9À-ÿ\u00f1\u00d1]*')]],
    });

  }

  selectLanguage(lang: string) {
    this.selectedLanguages = lang;
    this._translateService.use(lang);
    this._translateService.get('HOME.STEP').subscribe(
      res => {this.step = res}
      
    );
    this._translateService.get('HOME.TITLEMSGCORRECT').subscribe(
      res => {this.tituloMensaje = res}
    );
    this._translateService.get('HOME.TEXTMSGCORRECT1').subscribe(
      res => {
        this.textoMensaje1 = res
      }
    );
    this._translateService.get('HOME.TEXTMSGCORRECT2').subscribe(
      res => this.textoMensaje2 = res
    );
  }

  datosParticipante() {

    this.infoParticipante = this.participanteForm.value;
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
                this._fileUploadService.actualizarArchivo(file, 'participante', idInscripcion, nombres, apellidos).then(
                  resp => {
                    if (resp) {
                      Swal.fire(this.tituloMensaje,
                        `${this.textoMensaje1} ${nombres} ${apellidos} ${this.textoMensaje2}`,
                        'success').then((result) => {
                          if (result.isConfirmed) {
                            this._router.navigateByUrl('/success');
                          }
      
                        });
                    }
                  }
                );
              } else {
                
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
    )
  }

  campoNoValido(campo) {
    let valor = this._campoValidoService.campoNoValido(campo, this.participanteForm);
    return valor;
  }

  campoNoValidoTipoIdentificacion(campo) {
    let valor = this._campoValidoService.campoNoValido(campo, this.identificacionForm);
    return valor;
  }

  obtenerDatosCompra(arrayProductos) {

    if (arrayProductos.nombre === 'Estudiante EPN Postgrado' || arrayProductos.nombre === 'Estudiante EPN Pregrado') {
      arrayProductos.participanteForm.institucion.value = 'Escuela Politécnica Nacional'
    }

    this.costoTotal += arrayProductos.costo;
    const idProducto = arrayProductos.idProducto;

    this.agregarEliminarProducto(this.productos, idProducto, 'agregar', arrayProductos);
    //console.log(this.arregloItemProducto);

  }

  eliminarProducto(idProductoEliminar) {

    this.agregarEliminarProducto(this.arregloItemProducto, idProductoEliminar, 'eliminarCosto')

    this.agregarEliminarProducto(this.arregloProductoCopia, idProductoEliminar, 'eliminar');
  }

  agregarEliminarProducto(arreglo, idProducto, tipo, arrayProductos?) {
    arreglo.forEach((producto, index) => {
      for (const key in producto) {
        if (producto.hasOwnProperty(key)) {
          if (producto[key] == idProducto) {

            if (tipo === 'agregar') {
              this.arregloItemProducto.splice(index, 0, arrayProductos);
              this.arregloProductoCopia.splice(index, 0, producto);
              this.productos.splice(index, 1);
            } else if (tipo === 'eliminar') {
              this.productos.splice(index, 0, producto);
              this.arregloProductoCopia.splice(index, 1);
            } else {
              this.arregloItemProducto.splice(index, 1);
              this.costoTotal -= producto.costo;
            }
          }
        }
      }
    });
  }

}
