import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensaje-fin-formulario',
  templateUrl: './mensaje-fin-formulario.component.html',
  styles: [
  ]
})
export class MensajeFinFormularioComponent implements OnInit {

  @Input('completo') completo: number;

  constructor() { }

  ngOnInit(): void {
    
    
  }

}
