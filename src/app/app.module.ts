import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Importación de modulos */
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

/* Importación de angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NoPageFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
