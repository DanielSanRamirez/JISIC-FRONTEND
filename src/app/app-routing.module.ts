import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importación de componentes
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

// Importación de modulo de rutas
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [

  // Ruta vacía
  { path: '', redirectTo: '/inscripcion', pathMatch: 'full' },

  // Ruta no encontrada
  { path:'**', component: NoPageFoundComponent }
];

@NgModule({
  // Importación de la rutas definidas
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],

  // Exportación del módulo de rutas
  exports: [RouterModule]
})
export class AppRoutingModule { }
