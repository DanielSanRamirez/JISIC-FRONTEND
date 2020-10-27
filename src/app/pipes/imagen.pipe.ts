import { Pipe, PipeTransform } from '@angular/core';

/* Importación de variables globales */
import { GLOBAL } from '../services/global'

const base_url = GLOBAL.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'participante' | 'factura'): string {
    if (!img) {
      return 'No encontró imagen'
    } else {
      return `${base_url}/uploads/descargar/${tipo}/${img}`;
    }
  }

}
