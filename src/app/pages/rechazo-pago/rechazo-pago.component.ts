import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-rechazo-pago',
  templateUrl: './rechazo-pago.component.html',
  styles: [
  ]
})
export class RechazoPagoComponent implements OnInit {

  public cargando: boolean = true;
  public selectedLanguages = 'formulario-en';
  public pago;
  public pagoId;
  public imagenSubir: File;
  public imagenValida: Boolean = false;
  public mostrarErrorArchivo: Boolean = false;

  constructor(
    private _translateService: TranslateService,
    private _pagoService: PagoService,
    private _route: ActivatedRoute,
    private _fileUploadService: FileUploadService,
  ) { 
    this.selectLanguage(this.selectedLanguages);
  }

  ngOnInit(): void {
    //obtendo el id de la ruta
    this.pagoId = this._route.snapshot.paramMap.get("id");
    this.obtenerDatos(this.pagoId)
  }

  selectLanguage(lang: string) {
    this.selectedLanguages = lang;
    this._translateService.use(lang);
  }

  obtenerDatos(id: string) {
    this.cargando = true;
    this._pagoService.getPago(id).subscribe(
      async resp => {
        this.pago = await resp.pago;
        this.cargando = false;
      }
    )
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

  actualizarFile() {
    this._fileUploadService.actualizarArchivoRechazo(
      this.imagenSubir,
      'factura',
      this.pagoId,
      this.pago.nombres,
      this.pago.apellidos
    );

  }

}
