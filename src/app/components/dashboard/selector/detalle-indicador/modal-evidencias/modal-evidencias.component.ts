import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-evidencias',
  templateUrl: './modal-evidencias.component.html',
  styleUrls: ['./modal-evidencias.component.css']
})
export class ModalEvidenciasComponent implements OnInit{

  files: File[] = [];

  constructor(
    private toastr: ToastrService
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
}
