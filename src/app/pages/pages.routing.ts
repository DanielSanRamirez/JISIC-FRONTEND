import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Implementación de guards
import { AuthGuard } from '../guards/auth.guard';

// Importación de componentes
import { FormularioComponent } from './formulario/formulario.component';
import { PagesComponent } from './pages.component';
import { MensajePreregistroComponent } from './mensaje-preregistro/mensaje-preregistro.component';
import { MensajeEmailConfirmadoComponent } from './mensaje-email-confirmado/mensaje-email-confirmado.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PreRegistroComponent } from './pre-registro/pre-registro.component';
import { MensajeBienvenidaComponent } from './mensaje-bienvenida/mensaje-bienvenida.component';
import { PreInscripcionComponent } from './pre-inscripcion/pre-inscripcion.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

// Importación de Guards
import { AdminGuard } from '../guards/admin.guard';
import { SecretariaGuard } from '../guards/secretaria.guard';
import { TesoreraGuard } from '../guards/tesorera.guard';


const routes: Routes = [
    {
        path: 'inscripcion',
        component: PagesComponent,
        children: [
            { path: '', component: FormularioComponent }
        ]
    },
    {
        path: 'success',
        component: MensajePreregistroComponent
    },
    {
        path: 'email-confirmation/:id',
        component: MensajeEmailConfirmadoComponent
    },
    {
        path: 'admin/dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: MensajeBienvenidaComponent, data: { titulo: 'BIENVENID@' } },

            // Rutas de Secretario/a
            { path: 'pre-inscripciones', canActivate: [SecretariaGuard], component: PreInscripcionComponent, data: { titulo: 'PRE-INSCRIPCIONES' } },

            // Rutas de Tesorero/a
            { path: 'inscripciones', canActivate: [TesoreraGuard], component: InscripcionComponent, data: { titulo: 'INSCRIPCIONES' } },

            // Rutas del Administrador/a
            { path: 'pre-registros', canActivate: [AdminGuard], component: PreRegistroComponent, data: { titulo: 'PRE-REGISTROS' } },
            { path: 'productos', canActivate: [AdminGuard], component: ProductosComponent, data: { titulo: 'PRODUCTOS' } },
            { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'USUARIOS' } }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }