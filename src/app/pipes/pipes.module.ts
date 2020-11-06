import { NgModule } from '@angular/core';

import { ImagenPipe } from './imagen.pipe';
import { ReportesPipe } from './reportes.pipe';



@NgModule({
  declarations: [ImagenPipe, ReportesPipe],
  exports: [ImagenPipe, ReportesPipe]
})
export class PipesModule { }
