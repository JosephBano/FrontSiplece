import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { Indicador } from '../../../../models/indicador.model';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';

@Component({
  selector: 'app-detalle-indicador',
  templateUrl: './detalle-indicador.component.html',
  styleUrls: ['./detalle-indicador.component.css']
})
export class DetalleIndicadorComponent implements OnInit{

  indicadorID: any;
  indicador!: Indicador;

  strTituloIndicador: any = '';
  strTipoIndicador: any = '';
  
  constructor(
    private route: ActivatedRoute,
    private indicadorService: IndicadorService,
  ) { } 
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const indicadorID = params['id'];
      this.indicadorID = indicadorID;
    })
    this.indicadorService.getIndicadorById(this.indicadorID).subscribe(data => {
      this.indicador = data;
      this.cargaDeDatos()
    })
    
  }

  cargaDeDatos(){
    console.log(this.indicador);
    
    this.strTituloIndicador = this.indicador.Detalle ;
    if(this.indicador.IdTipoEvaluacion == "1") this.strTipoIndicador = 'Cuantitativo';
    else this.strTipoIndicador = 'Cualitativo'
  }
}
