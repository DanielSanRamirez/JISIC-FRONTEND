import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Pais } from 'src/app/models/pais.model';
import { PaisService } from 'src/app/services/pais.service';

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
  public paises: Pais[] = [];

  constructor(
    private _translateService: TranslateService,
    private _fb: FormBuilder,
    private _paisService: PaisService,
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
    /*this.inscripcionId = this._route.snapshot.paramMap.get("id");

    this.participanteForm = this._fb.group({
      nombres: ['', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
      apellidos: ['', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
      direccion: ['', Validators.required],
      codTelefono: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      pais: ['', Validators.required],
    });*/
  }

  selectLanguage(lang: string) {
    this.selectedLanguages = lang;
    this._translateService.use(lang);
    this._translateService.get('FACTURA.STEP').subscribe(
      res => {this.step = res}
      
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

}
