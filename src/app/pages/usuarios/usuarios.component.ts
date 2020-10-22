import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importación de modelo
import { Usuario } from 'src/app/models/usuario.model';

// Importación de servicio
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

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
  public dato: 'nombres' | 'perfil' | 'estado' = 'nombres';
  public usuarioForm: FormGroup;
  public usuarioL: Usuario;

  constructor(
    private _usuarioService: UsuarioService,
    private _fb: FormBuilder,
  ) { 
    this.usuarioL = _usuarioService.usuario;
  }

  ngOnInit(): void {

    this.cargarUsuarios();

    this.usuarioFormGroup();
    
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

  cambiarBusqueda(value) {
    this.dato = value.target.value;
  }

  limpiarDatos() {
    this.usuarioFormGroup();
  }

  usuarioFormGroup() {
    this.usuarioForm = this._fb.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required],
      perfil: ['', Validators.required],
      nombres: ['', Validators.required],
    });
  }

  guardardatosUsuario() {
    const { nombre } = this.usuarioForm.value;

    // Crear producto
    this._usuarioService.crearUsuario(this.usuarioForm.value).subscribe(
      (resp: any) => {
        Swal.fire('Creado', `Usuario ${nombre} creado correctamente`, 'success');
        this.cargarUsuarios();
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    )
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }
    
    this._usuarioService.buscar(this.dato, termino)
      .subscribe((resultados: Usuario[]) => {
        this.usuarios = resultados;
      }
      );
  }

  obtenerUsuario(usuario) {
    
    this.usuarioForm = this._fb.group({
      nombre: [usuario.nombre, Validators.required],
      nombres: [usuario.nombres, Validators.required],
      perfil: [usuario.perfil, Validators.required],
      password: [usuario.password],
      id: [usuario._id]
    });
  }

  actualizardatosUsuario() {
    this._usuarioService.actualizarUsuario(this.usuarioForm.value)
      .subscribe(
        (resp: any) => {
          Swal.fire('Actualizado', `Producto ${this.usuarioForm.value.nombre} actualizado correctamente`, 'success');
          this.cargarUsuarios();
        },
        err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      )
  }

}
