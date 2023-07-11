import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vista-parametros',
  templateUrl: './vista-parametros.component.html',
  styleUrls: ['./vista-parametros.component.css']
})
export class VistaParametrosComponent implements OnInit{
  showPeriodo: boolean = true;
  showPonderacion: boolean = false;
  showTipoEvaluacion: boolean = false;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.actualizarActiveLiOrder1('parametros');
  }

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
