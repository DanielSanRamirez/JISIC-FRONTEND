import { Component, OnInit } from '@angular/core';

// Importación de modelo
import { Usuario } from 'src/app/models/usuario.model';

// Importación de servicio
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public cargando: boolean = true;
  public desde: number = 0;
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  constructor(
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {

    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuariosPaginado(this.desde).subscribe(
      ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      }
    )
  }

}
