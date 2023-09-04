import { Component, Input, OnInit } from '@angular/core';
import { ArchivoEvidencia } from 'src/app/models/modelos-generales/archivo-evidencia.model';
import { Evidencia } from 'src/app/models/modelos-generales/evidencia.model';
import { EvidenciaService } from 'src/app/services/modeloServicios/evidencia.service';

@Component({
  selector: 'app-informacion-modal',
  templateUrl: './informacion-modal.component.html',
  styleUrls: ['./informacion-modal.component.css']
})
export class InformacionModalComponent {

  @Input() DetalleEvidencia: any;

}
