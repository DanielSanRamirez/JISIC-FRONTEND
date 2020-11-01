import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParticipanteService } from 'src/app/services/participante.service';

@Component({
  selector: 'app-mensaje-email-confirmado',
  templateUrl: './mensaje-email-confirmado.component.html',
  styles: [
  ]
})
export class MensajeEmailConfirmadoComponent implements OnInit {

  public participanteId: string;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _participanteService: ParticipanteService
  ) { 
    this.participanteId = this._activateRoute.snapshot.paramMap.get("id");
    this._participanteService.actualizarEstadoParticipante(this.participanteId).subscribe(
      resp => {
        console.log();
      }
    )
    
  }

  ngOnInit(): void {
  }

}
