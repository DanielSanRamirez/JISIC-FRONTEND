import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Importación de servicios
import { UsuarioService } from 'src/app/services/usuario.service';

// Importación para popup
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public loginForm = this._fb.group({
    nombre: ['', Validators.required],
    password: ['', Validators.required],
    perfil: ['', Validators.required]
  });

  constructor(
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  login() {

    this._usuarioService.login(this.loginForm.value)
      .subscribe(
        resp => {

          // Navegar al Dashboard
          this._router.navigateByUrl('/admin/dashboard');
        },
        err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      )
  }

}
