import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto.model';

// Importar el servicio
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductosComponent implements OnInit {

  public cargando: boolean = true;
  public desde: number = 1;
  public totalProductos: number = 0;
  public productos: Producto[] = [];
  public productosTemp: Producto[] = [];
  public productoForm: FormGroup;
  public element = [];

  constructor(
    private _productoService: ProductoService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.cargarProductos();

    this.productoFormGroup();

  }

  cargarProductos() {
    this.cargando = true;
    this._productoService.cargarProductosPaginado(this.desde).subscribe(
      ({ totalPages, productos }) => {
        this.totalProductos = totalPages;
        for (let index = 0; index < totalPages; index++) {
          this.element[index] = index + 1;
        }
        this.productos = productos;
        this.productosTemp = productos;
        this.cargando = false;
      }
    )
  }

  productoFormGroup() {
    this.productoForm = this._fb.group({
      nombre: ['', Validators.required],
      name: ['', Validators.required],
      costo: ['', [Validators.required, Validators.min(0)]]
    });
  }

  limpiarDatos() {
    this.productoFormGroup();
  }

  guardardatosProducto() {
    const { nombre } = this.productoForm.value;

    // Crear producto
    this._productoService.crearProducto(this.productoForm.value).subscribe(
      (resp: any) => {
        Swal.fire('Creado', `Producto ${nombre} creado correctamente`, 'success');
        this.cargarProductos();
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    )
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.productos = this.productosTemp;
    }
    this._productoService.buscar(termino)
      .subscribe((resultados: Producto[]) => {
        this.productos = resultados;
      }
      );
  }

  obtenerProducto(producto) {
    this.productoForm = this._fb.group({
      nombre: [producto.nombre, Validators.required],
      name: [producto.name, Validators.required],
      costo: [producto.costo, [Validators.required, Validators.min(0)]],
      id: [producto._id]
    });
  }

  actualizardatosProducto() {
    this._productoService.actualizarProducto(this.productoForm.value)
      .subscribe(
        (resp: any) => {
          Swal.fire('Actualizado', `Producto ${this.productoForm.value.nombre} actualizado correctamente`, 'success');
          this.cargarProductos();
        },
        err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      )
  }

  eliminarProducto(producto) {

    Swal.fire({
      title: '¿Borrar producto?',
      text: `Esta a punto de borrar el producto ${producto.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {

        this._productoService.eliminarProducto(producto)
          .subscribe(
            resp => {
              this.cargarProductos();
              Swal.fire('producto borrado', `${producto.nombre} fue eliminado correctamente`, 'success')
            }
          );
      }
    })
  }

  cambiarPagina(valor) {

    if (this.desde === 1 && valor === 'restar') {
      this.desde = 1;

    } else if (this.desde === this.totalProductos && valor === 'sumar') {
      this.desde = this.totalProductos
    } else if (this.desde !== 1 && valor === 'restar') {
      this.desde -= 1;
    } else if (this.desde !== this.totalProductos && valor === 'sumar') {
      this.desde += 1;
    } else {
      this.desde = valor;
    }
    this.cargarProductos();
  }

}
