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
import { PorPagarComponent } from './por-pagar/por-pagar.component';
import { InscritosComponent } from './inscritos/inscritos.component';
import { RechazoPreInscripcionComponent } from './rechazo-pre-inscripcion/rechazo-pre-inscripcion.component';
import { DatosFacturaComponent } from './datos-factura/datos-factura.component';
import { MensajeFinPagoComponent } from './mensaje-fin-pago/mensaje-fin-pago.component';


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
        path: 'rechazo/pre-inscripcion/:id',
        component: RechazoPreInscripcionComponent
    },
    {
        path: 'datos-factura/:id',
        component: DatosFacturaComponent
    },
    {
        path: 'success-pay',
        component: MensajeFinPagoComponent
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
            { path: 'pagos', canActivate: [TesoreraGuard], component: InscripcionComponent, data: { titulo: 'PAGOS' } },

            // Rutas del Administrador/a
            { path: 'registros', canActivate: [AdminGuard], component: PreRegistroComponent, data: { titulo: 'REGISTROS' } },
            { path: 'productos', canActivate: [AdminGuard], component: ProductosComponent, data: { titulo: 'PRODUCTOS' } },
            { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'USUARIOS' } },
            { path: 'por-pagar', canActivate: [AdminGuard], component: PorPagarComponent, data: { titulo: 'POR PAGAR' } },
            { path: 'inscritos', canActivate: [AdminGuard], component: InscritosComponent, data: { titulo: 'INSCRITOS' } }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }