import { Component, Input, OnInit } from '@angular/core';
import { Evidencia } from 'src/app/models/modelos-generales/evidencia.model';
import { EvidenciaService } from 'src/app/services/modeloServicios/evidencia.service';

@Component({
  selector: 'app-estado-evidencia',
  templateUrl: './estado-evidencia.component.html',
  styleUrls: ['./estado-evidencia.component.css']
})
export class EstadoEvidenciaComponent implements OnInit {
  
  @Input() idElemento: any;
  
  Evidencias: Evidencia[] = [];

  ActiveRols= '1';

  tituloStr = '';

  constructor (
    private evidenciaService: EvidenciaService,
  ) { }
  
  ngOnInit(): void {
    this.loadData();
    this.loadTitle();
  }

  loadData() {
    this.evidenciaService.getByElemento(this.idElemento).subscribe(
      (data) => {
        this.Evidencias = data.filter( e => e.Activo == '1');
      }
    )
  }

  loadTitle() {
    switch (this.ActiveRols) {
      case '1': this.tituloStr = 'Asignar Usuario';
      break;
      case '2': this.tituloStr = 'Evidencias Subidas';
      break
    }
  }

  GetMaxCharacters(cadena: string | undefined): string {
    if (!cadena) return '';
  
    if (cadena.length <= 150) {
      return cadena;
    } else {
      const palabras = cadena.split(' ');
      let cadenaFin = '';
      let characterCount = 0;
      
      for (const palabra of palabras) {
        if (characterCount + palabra.length + cadenaFin.length <= 150) {
          cadenaFin += palabra + ' ';
          characterCount += palabra.length + 1;
        } else {
          break;
        }
      }
      
      return cadenaFin.trim() + '...';
    }
  }
}
