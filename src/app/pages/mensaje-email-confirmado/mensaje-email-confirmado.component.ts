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
  public estadoParticipante: boolean = false;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _participanteService: ParticipanteService
  ) {
    this.participanteId = this._activateRoute.snapshot.paramMap.get("id");
    
  }

  ngOnInit(): void {
    this._participanteService.obtenerParticipante(this.participanteId).subscribe(
      resp => {
        this.estadoParticipante = resp.participante.estado;
        if (this.estadoParticipante === false) {
          this._participanteService.actualizarEstadoParticipante(this.participanteId).subscribe(
            resp => {
              console.log();
            }
          )
        }
      }
    )

    
  }

}
