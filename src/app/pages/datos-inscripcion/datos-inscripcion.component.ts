import { Component, Input, OnInit } from '@angular/core';
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

  @Input('perfil') perfil: string = 'estudiante';
  @Input('perfilEn') perfilEn: string = 'student';
  @Input('costo') costo: number = 20;
  @Input('idioma') idioma: string;

  constructor(
    private _fb: FormBuilder,
    private _campoValidoService: CampoValidoService
  ) { }

  ngOnInit(): void {
    this.participanteForm = this._fb.group({
      tipoIdentificacion: ['1', Validators.required],
      identificacion: ['1714108568', [Validators.required, Validators.pattern('[0-9]*')]],
      pasaporte: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    });
    console.log(this.participanteForm.controls.tipoIdentificacion.value);
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

}
