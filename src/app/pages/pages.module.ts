import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario/formulario.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/* Sirve para los módulos del formulario */
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

/* Importación de angular material */
import {MatStepperModule} from '@angular/material/stepper';
import { DatosInscripcionComponent } from './datos-inscripcion/datos-inscripcion.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    FormularioComponent,
    DatosInscripcionComponent
  ],

  exports: [
    FormularioComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ]
})
export class PagesModule { }
