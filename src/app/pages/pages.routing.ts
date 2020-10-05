import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Importación de componentes
import { FormularioComponent } from './formulario/formulario.component';
import { PagesComponent } from './pages.component';
import { MensajePreregistroComponent } from './mensaje-preregistro/mensaje-preregistro.component';


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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }