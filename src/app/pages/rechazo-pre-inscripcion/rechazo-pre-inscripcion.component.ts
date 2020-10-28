import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ParticipanteService } from 'src/app/services/participante.service';

@Component({
  selector: 'app-rechazo-pre-inscripcion',
  templateUrl: './rechazo-pre-inscripcion.component.html',
  styles: [
  ]
})
export class RechazoPreInscripcionComponent implements OnInit {

  public inscripcionId;
  public inscripcion;
  public producto;
  public selectedLanguages = 'formulario-en';
  public cargando: boolean = true;
  public imagenValida: Boolean = false;
  public imagenSubir: File;
  public mostrarErrorArchivo: Boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _inscripcionService: InscripcionService,
    private _translateService: TranslateService,
    private _fileUploadService: FileUploadService,
    private _participanteService: ParticipanteService
  ) {
    this.selectLanguage(this.selectedLanguages);
    console.log(this.selectedLanguages);

  }

  ngOnInit(): void {
    //obtendo el id de la ruta
    this.inscripcionId = this._route.snapshot.paramMap.get("id");
    this.obtenerDatos(this.inscripcionId)
  }

  selectLanguage(lang: string) {
    this.selectedLanguages = lang;
    this._translateService.use(lang);
  }

  obtenerDatos(id: string) {
    this.cargando = true;
    this._inscripcionService.getInscripcion(id).subscribe(
      async resp => {
        this.inscripcion = await resp.inscripcion;
        this.producto = await resp.inscripcion.producto;
        console.log(this.inscripcion);
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
      'participante',
      this.inscripcionId,
      this.inscripcion.participante.nombres,
      this.inscripcion.participante.apellidos
    );
    this._participanteService.actualizarEstadoParticipante(this.inscripcion.participante._id).subscribe(
      resp => {
        console.log(resp);
      }
    )

  }

}
