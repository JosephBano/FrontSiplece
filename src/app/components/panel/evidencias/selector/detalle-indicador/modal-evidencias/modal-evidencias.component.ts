import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ElementoFundamental } from 'src/app/models/modelos-generales/elemento-fundamental.model';
import { Evidencia } from '../../../../../../models/modelos-generales/evidencia.model';
import { EvidenciaService } from 'src/app/services/modeloServicios/evidencia.service';

@Component({
  selector: 'app-modal-evidencias',
  templateUrl: './modal-evidencias.component.html',
  styleUrls: ['./modal-evidencias.component.css']
})
export class ModalEvidenciasComponent implements OnInit{

  files: File[] = [];
  @Input() elemento: any;
  Evidencias: Evidencia[] = [];

  constructor(
    private toastr: ToastrService,
    private evidenciaService: EvidenciaService,
  ) { }

  ngOnInit(): void {
    
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.files) {
      this.files = [...this.files, ...Array.from(element.files)];
    }
    element.value = '';
  }
  
  onUpload() {
    this.toastr.success("Archivos subidos con exito")
    this.files = []
  }

  openModal() {
    this.evidenciaService.getEvidencia().subscribe(
      (data) => {
        this.Evidencias = data.filter( e => e.IdElemento == this.elemento);
        console.log(data);
        console.log(this.Evidencias);
        
      }
    )
  }
}
