import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';

// Importar el servicio
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductosComponent implements OnInit {

  public cargando: boolean = true;
  public desde: number = 0;
  public totalProductos: number = 0;
  public productos: Producto[] = [];
  public productosTemp: Producto[] = [];

  constructor(
    private _productoService: ProductoService
  ) { }

  ngOnInit(): void {

    this.cargarUsuarios();

  }

  cargarUsuarios() {
    this.cargando = true;
    this._productoService.cargarProductosPaginado(this.desde).subscribe(
      ({ total, productos }) => {
        this.totalProductos = total;
        this.productos = productos;
        this.productosTemp = productos;
        this.cargando = false;
      }
    )
  }

}
