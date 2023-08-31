import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estado-evidencia',
  templateUrl: './estado-evidencia.component.html',
  styleUrls: ['./estado-evidencia.component.css']
})
export class EstadoEvidenciaComponent {
 @Input() idElemento: any;
}
