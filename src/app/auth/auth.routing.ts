import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Componentes que pertenecen a la carpeta auth */
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    
    { path: 'login-admin', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }