import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { Indicador } from '../../../../../models/indicador.model';

@Component({
  selector: 'app-detalle-indicador',
  templateUrl: './detalle-indicador.component.html',
  styleUrls: ['./detalle-indicador.component.css']
})
export class DetalleIndicadorComponent implements OnInit {
  indicador!: Indicador;
  strTituloIndicador = '';
  strTipoIndicador = '';
  
  constructor(
    private route: ActivatedRoute,
    private indicadorService: IndicadorService,
    private cdr: ChangeDetectorRef,
  ) { }
   

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const indicadorID = params['id'];
      this.getIndicadorById(indicadorID);
    });
  }

  getIndicadorById(id: string): void {
    this.indicadorService.getIndicadorById(id).subscribe(
      data => {
        if (data && data.length > 0) {
          this.indicador = data[0]; 
          if (this.indicador) {
            this.cargaDeDatos();
          }
        }
      }
    );
  }

  cargaDeDatos(): void {
    this.strTituloIndicador = this.indicador.Detalle || '';
    this.strTipoIndicador = this.indicador.IdTipoEvaluacion === "1" ? 'Cuantitativo' : 'Cualitativo';
  }
  
}