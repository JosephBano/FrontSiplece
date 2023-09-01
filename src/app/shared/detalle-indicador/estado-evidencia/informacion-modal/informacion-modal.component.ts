import { Component, Input, OnInit } from '@angular/core';
import { Evidencia } from 'src/app/models/modelos-generales/evidencia.model';
import { EvidenciaService } from 'src/app/services/modeloServicios/evidencia.service';

@Component({
  selector: 'app-informacion-modal',
  templateUrl: './informacion-modal.component.html',
  styleUrls: ['./informacion-modal.component.css']
})
export class InformacionModalComponent implements OnInit {

  @Input() IdEvidencia: any;

  DetalleEvidencia: string|undefined = 'juan';
  
  constructor (
    private evidenciaService: EvidenciaService
  ) { }

  ngOnInit(): void {
    this.evidenciaService.getEvidenciaById(this.IdEvidencia).subscribe( 
      data =>{
        if(data) this.DetalleEvidencia = data.Detalle
        console.log(data);
      })
  }
}
