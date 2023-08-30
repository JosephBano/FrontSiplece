import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Indicador } from 'src/app/models/modelos-generales/indicador.model';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';

@Component({
  selector: 'app-indicador-table',
  templateUrl: './indicador-table.component.html',
  styleUrls: ['./indicador-table.component.css']
})
export class IndicadorTableComponent implements OnInit{

  indicadores: Indicador[] = [];
  @Input() IdSubCriterio = "";
  @Input() redireccionRol: any;
  selectedIndicador: any;

  constructor(private indicadorService: IndicadorService,
              private route: Router)
  { }

  ngOnInit(): void {
    this.indicadorService.getIndicador().subscribe(data => {
      this.indicadores = data;
    })    
  }

  handleRowClick(indicador: any) {
    this.selectedIndicador = indicador;
    console.log(this.redireccionRol);
    
    this.route.navigate(['panel/evidencias/detalle', this.selectedIndicador])
  }
  
}
