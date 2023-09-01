import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { Indicador } from '../../models/modelos-generales/indicador.model';
import { DataService } from 'src/app/services/data.service';
import { ElementoFundamentalService } from 'src/app/services/modeloServicios/elemento-fundamental.service';
import { ElementoFundamental } from 'src/app/models/modelos-generales/elemento-fundamental.model';

@Component({
  selector: 'app-detalle-indicador',
  templateUrl: './detalle-indicador.component.html',
  styleUrls: ['./detalle-indicador.component.css']
})
export class DetalleIndicadorComponent implements OnInit {
  indicador!: Indicador;
  Elementos: ElementoFundamental[] = []; 

  strTituloIndicador = '';
  strTipoIndicador = '';

  selectedEsenciales: number | null = null;
  selectedComplementarios: number | null = null;

  rolview = '2';
  
  constructor(
    private route: ActivatedRoute,
    private indicadorService: IndicadorService,
    private dataService: DataService,
    private elementoService: ElementoFundamentalService,
  ) { }
   

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const indicadorID = params['id'];
      this.getIndicadorById(indicadorID);
      this.loadElementosById(indicadorID);
    });
  }

  loadElementosById(id: any){    
    this.elementoService.getElementoFundamental().subscribe(
      (data) => {
        this.Elementos = data.filter( e => e.IdIndicador == id);
      }
    )
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