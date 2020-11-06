import { Pipe, PipeTransform } from '@angular/core';

/* Importación de variables globales */
import { GLOBAL } from '../services/global'

const base_url = GLOBAL.base_url;

@Pipe({
  name: 'reportes'
})
export class ReportesPipe implements PipeTransform {

  transform(tipo: 'pre-inscripcion' | 'por-pagar' | 'pagos' | 'inscritos') {

    return `${base_url}/reportes/${tipo}`;
  }

}
