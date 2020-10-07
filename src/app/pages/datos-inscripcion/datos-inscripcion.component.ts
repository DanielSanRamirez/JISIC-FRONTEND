import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importación del servicio
import { CampoValidoService } from 'src/app/services/campoValido.service';

@Component({
  selector: 'app-datos-inscripcion',
  templateUrl: './datos-inscripcion.component.html',
  styleUrls: ['./datos-inscripcion.component.css']
})
export class DatosInscripcionComponent implements OnInit {

  public ver = false;
  public participanteForm: FormGroup;
  public imagenSubir: File;
  public imagenValida: Boolean = false;
  public mostrarErrorArchivo: Boolean = false;

  @Input('_id') _id: string;
  @Input('perfil') perfil: string = 'estudiante';
  @Input('perfilEn') perfilEn: string = 'student';
  @Input('costo') costo: number = 20;
  @Input('idioma') idioma: string;

  @Output()
  public enviarArreglo = new EventEmitter<Object>();

  constructor(
    private _fb: FormBuilder,
    private _campoValidoService: CampoValidoService
  ) { }

  ngOnInit(): void {
    this.participanteForm = this._fb.group({
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      pasaporte: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    });

  }

  verInfo() {
    if (this.ver == false) {
      this.ver = true;
    } else {
      this.ver = false;
    }
  }

  campoNoValido(campo) {
    const valor = this._campoValidoService.campoNoValido(campo, this.participanteForm);
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

  agregarCarrito(idProducto) {

    const itemCarrito = {
      idProducto: idProducto,
      costo: this.costo,
      nombre: this.perfil,
      name: this.perfilEn,
      participanteForm: this.participanteForm.controls,
      file: this.imagenSubir
    };

    this.enviarArreglo.emit(itemCarrito);
  }

}
