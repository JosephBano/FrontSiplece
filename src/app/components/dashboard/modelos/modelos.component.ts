import { Component, OnInit, Input } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/modelo.model';
import { SelectedInstitucionService } from 'src/app/services/selected-institucion.service';
@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {
  
  @Input() institucionId: string | undefined;
  modelos: Modelo[] = [];

  constructor (private modeloService: ModeloService, private selectedInstitucionService: SelectedInstitucionService) {  }

  ngOnInit(): void {
    this.selectedInstitucionService.institucion$.subscribe(institucion => {
      if (institucion?.id) {
        this.loadModelos(institucion.id);
      } else {
        this.modelos = [];
      }
    });
  }
  
  private loadModelos(institucionId: string): void {
    this.modeloService.getModelos(institucionId).subscribe((modelos: Modelo[]) => {
      this.modelos = modelos;
    });
  }
  
}
