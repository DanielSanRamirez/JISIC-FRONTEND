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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import {MatIconModule} from '@angular/material/icon'
import { PipesModule } from '../pipes/pipes.module';

// Importación de componentes
import { DatosInscripcionComponent } from './datos-inscripcion/datos-inscripcion.component';
import { PagesComponent } from './pages.component';
import { MensajeFinFormularioComponent } from './mensaje-fin-formulario/mensaje-fin-formulario.component';
import { MensajePreregistroComponent } from './mensaje-preregistro/mensaje-preregistro.component';
import { RouterModule } from '@angular/router';
import { MensajeEmailConfirmadoComponent } from './mensaje-email-confirmado/mensaje-email-confirmado.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PreRegistroComponent } from './pre-registro/pre-registro.component';
import { MensajeBienvenidaComponent } from './mensaje-bienvenida/mensaje-bienvenida.component';
import { PreInscripcionComponent } from './pre-inscripcion/pre-inscripcion.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PorPagarComponent } from './por-pagar/por-pagar.component';
import { InscritosComponent } from './inscritos/inscritos.component';
import { RechazoPreInscripcionComponent } from './rechazo-pre-inscripcion/rechazo-pre-inscripcion.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    FormularioComponent,
    DatosInscripcionComponent,
    PagesComponent,
    MensajeFinFormularioComponent,
    MensajePreregistroComponent,
    MensajeEmailConfirmadoComponent,
    DashboardComponent,
    PreRegistroComponent,
    MensajeBienvenidaComponent,
    PreInscripcionComponent,
    InscripcionComponent,
    ProductosComponent,
    UsuariosComponent,
    PorPagarComponent,
    InscritosComponent,
    RechazoPreInscripcionComponent,
  ],

  exports: [
    FormularioComponent,
    PagesComponent,
    TranslateModule
  ],

  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
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
