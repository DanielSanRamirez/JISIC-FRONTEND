import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mensaje-bienvenida',
  templateUrl: './mensaje-bienvenida.component.html',
  styles: [
  ]
})
export class MensajeBienvenidaComponent implements OnInit {

  public usuario: Usuario

  constructor(
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
  }

}
