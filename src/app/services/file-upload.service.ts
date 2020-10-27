import { Injectable } from '@angular/core';

/* Importación de variables globales */
import { GLOBAL } from '../services/global'

/* Importar el paquete que me ayuda a los mensajes */
import Swal from 'sweetalert2';

// Importación para rutas
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const base_url = GLOBAL.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private _router: Router,
    private _http: HttpClient,
  ) { }

  async actualizarArchivo(
    archivo: File,
    tipo: 'participante' | 'factura',
    id: string,
    nombres: string,
    apellidos: string
  ) {
    try {
      const url = `${base_url}/uploads/${tipo}/${id}`;
      const formData = new FormData();

      formData.append('archivo', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        body: formData
      });

      const data = await resp.json();

      if (data.ok) {
        Swal.fire('Creado',
        `La pre-inscripción del participante ${nombres} ${apellidos} ha sido creado correctamente.`,
        'success').then((result) => {
            if (result.isConfirmed) {
              this._router.navigateByUrl('/success');
            }

          });
        
        return data.nombreArchivo;
      } else {
        Swal.fire('Error', data.msg, 'error');
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }

  downloadImagen(
    tipo: 'participante' | 'factura',
    archivo: string
  ) {
    
    const url = `${base_url}/uploads/descargar/${tipo}/${archivo}`;
    console.log(url);
    return this._http.get(url);
  }

}