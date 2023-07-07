import { Component } from '@angular/core';

@Component({
  selector: 'app-vista-parametros',
  templateUrl: './vista-parametros.component.html',
  styleUrls: ['./vista-parametros.component.css']
})
export class VistaParametrosComponent {
  showPeriodo: boolean = true;
  showPonderacion: boolean = false;
  showTipoEvaluacion: boolean = false;

  ToggleFocusCard(card: string): void {
    this.showPeriodo = false;
    this.showPonderacion = false;
    this.showTipoEvaluacion = false;

    switch(card) {
      case 'periodo':
        this.showPeriodo = true;
        break;
      case 'ponderacion':
        this.showPonderacion = true;
        break;
      case 'tipoEvaluacion':
        this.showTipoEvaluacion = true;
        break;
    }
  }
}
