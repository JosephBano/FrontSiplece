import { Component, OnInit, Input } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/modelo.model';
@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {
  
  @Input() institucionId: string | undefined;
  modelos: Modelo[] = [];

  constructor (private modeloService: ModeloService) {  }

  ngOnInit(): void {
    this.loadModelos();
  }

  private loadModelos(): void {
    if (this.institucionId) {
      this.modeloService.getModelos(this.institucionId).subscribe((modelos: Modelo[]) => {
        this.modelos = modelos;
      });
    }
  }
}
