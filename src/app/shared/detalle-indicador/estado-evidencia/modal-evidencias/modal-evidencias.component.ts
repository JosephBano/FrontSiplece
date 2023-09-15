import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Evidencia } from '../../../../models/modelos-generales/evidencia.model';
import { EvidenciaService } from 'src/app/services/modeloServicios/evidencia.service';
import { ArchivoEvidenciaService } from 'src/app/services/modeloServicios/archivo-evidencia.service';

@Component({
  selector: 'app-modal-evidencias',
  templateUrl: './modal-evidencias.component.html',
  styleUrls: ['./modal-evidencias.component.css']
})
export class ModalEvidenciasComponent implements OnInit{

  files: File[] = [];
  formData: FormData = new FormData();
  @Input() elemento: any;
  Evidencias: Evidencia[] = [];

  constructor(
    private toastr: ToastrService,
    private evidenciaService: EvidenciaService,
    private archivoEvService: ArchivoEvidenciaService,
  ) { }

  ngOnInit(): void {
    
  }

  onFileSelected(event: Event) {
    console.log(this.formData);
    const element = event.target as HTMLInputElement;
    if (element.files) {
      this.files = [...this.files, ...Array.from(element.files)];
    
      this.formData.append('file',this.files[this.files.length-1],new Date().getTime().toString()+'_'+this.files[this.files.length-1].name);
    }
    element.value = '';
  }
  
  onUpload() {    
    this.archivoEvService.PostFile(this.formData).subscribe(data => console.log(data));
    /*this.toastr.success("Archivos subidos con exito")*/
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
