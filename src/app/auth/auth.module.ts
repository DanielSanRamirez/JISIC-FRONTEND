import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Importación del módulo de ruteo */
import { RouterModule } from '@angular/router';

/* Importación del módulo http */
import { HttpClientModule } from '@angular/common/http'

/* Importación del módulo de formulario */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importación de componentes
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],

  /* Sirve para utilizar fuera del módulo */
  exports: [
    LoginComponent,
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
