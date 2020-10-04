import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class CampoValidoService {

  constructor() { }

  campoNoValido(campo: string, camposValidar: FormGroup): boolean {
    if (camposValidar.get(campo).invalid) {
      return true;
    } else {
      return false;
    }
  }

}