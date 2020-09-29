import { Component } from '@angular/core';

/* Importación del las varibles globales */
import { GLOBAL } from '../app/services/global'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public banner: string = GLOBAL.banner;


}
