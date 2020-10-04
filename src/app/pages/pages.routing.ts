import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Importación de componentes
import { FormularioComponent } from './formulario/formulario.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    {
        path: 'inscripcion',
        component: PagesComponent,
        children: [
            { path: '', component: FormularioComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }