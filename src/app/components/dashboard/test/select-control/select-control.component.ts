import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Indicador } from 'src/app/models/indicador.model';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';

@Component({
  selector: 'app-select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.css']
})
export class SelectControlComponent implements OnInit{

  indicadores: Indicador[] = [];
  @Input() IdSubCriterio = "";
  selectedIndicador: any;

  constructor(private indicadorService: IndicadorService) { }

  ngOnInit(): void {
    this.indicadorService.getIndicador().subscribe(data => {
      this.indicadores = data;
    })    
  }

  handleRowClick(indicador: any) {
    this.selectedIndicador = indicador;
    console.log('Row clicked:', indicador);
    // Add your custom logic or function call
  }
  
}
