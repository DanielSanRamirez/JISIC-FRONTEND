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

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: [
  ]
})
export class FormularioComponent implements OnInit, AfterViewInit {

  public participanteForm: FormGroup;
  public inscripcionForm = [];
  public selectedLanguages = 'formulario-es';
  public step = [];
  public paises: Pais[] = [];
  public productos: Producto[] = [];
  public infoParticipante: Participante;
  public costoTotal: number = 0;
  public arregloItemProducto = [];
  public arregloProductoCopia = [];

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private _translateService: TranslateService,
    private _fb: FormBuilder,
    private _paisService: PaisService,
    private _productoService: ProductoService,
    private _campoValidoService: CampoValidoService,
    private _participanteService: ParticipanteService

  ) {
    this._translateService.setDefaultLang(this.selectedLanguages);
    this._translateService.use(this.selectedLanguages);
    this._translateService.get('HOME.STEP').subscribe(
      res => this.step = res
    )

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.stepper.selectedIndex = 1;
    })
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
      nombres: ['Daniel Sebastián', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
      apellidos: ['Ramírez', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
      direccion: ['La Vicentina', Validators.required],
      codTelefono: ['5ec46b09c0bb9535c0ebdbbf', Validators.required],
      telefono: ['987890751', [Validators.required, Validators.pattern('[0-9]*')]],
      email: ['daniel@gmail.com', [Validators.required, Validators.email]],
      pais: ['5ec46b09c0bb9535c0ebdbbf', Validators.required]
    })
  }

  selectLanguage(lang: string) {
    this.selectedLanguages = lang;
    this._translateService.use(lang);
    this._translateService.get('HOME.STEP').subscribe(
      res => this.step = res
    )
  }

  datosParticipante() {

    this.infoParticipante = this.participanteForm.value;
    const {nombres, apellidos} = this.participanteForm.value;
    this._participanteService.crearParticipante(this.infoParticipante).subscribe(
      resp => {
        console.log(this.arregloItemProducto);
        Swal.fire('Creado', `${nombres} ${apellidos} creado correctamente`, 'success');
      },
      err => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    )
  }

  campoNoValido(campo) {
    const valor = this._campoValidoService.campoNoValido(campo, this.participanteForm);
    return valor;
  }

  obtenerDatosCompra(arrayProductos) {
    
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
            } else if (tipo === 'eliminar'){
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
