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
            { path: 'pre-registros', component: PreRegistroComponent, data: { titulo: 'PRE-REGISTROS' } },
            { path: 'pre-inscripciones', component: PreInscripcionComponent, data: { titulo: 'PRE-INSCRIPCIONES' } },
            { path: 'inscripciones', component: InscripcionComponent, data: { titulo: 'INSCRIPCIONES' } },
            { path: 'productos', component: ProductosComponent, data: { titulo: 'PRODUCTOS' } },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'USUARIOS' } }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }