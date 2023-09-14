import { Component, Input, OnInit } from '@angular/core';
import { ArchivoEvidencia } from '../../../../models/modelos-generales/archivo-evidencia.model';
import { ArchivoEvidenciaService } from 'src/app/services/modeloServicios/archivo-evidencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-evidencia-file-contenedor',
  templateUrl: './evidencia-file-contenedor.component.html',
  styleUrls: ['./evidencia-file-contenedor.component.css']
})
export class EvidenciaFileContenedorComponent implements OnInit{
  @Input() IdEvidencia: any;
  
  Archivos: ArchivoEvidencia[] = [];
  radiobuton!: FormGroup;
  
  //rolviewradios = '1';
  //rolviewradios = '2';
  @Input() rolviewradios: any;

  constructor(
    private archivoService: ArchivoEvidenciaService,
    private fb: FormBuilder,
  ) {
    this.radiobuton = this.fb.group({
      estado: ['0', [Validators.required]] 
    })
   }

  ngOnInit(): void {
    this.archivoService.GetByEvidencia(this.IdEvidencia).subscribe( data => this.Archivos = data);
  }

  GetNameFile(id: string | undefined): string {
    //const archivos = ['file1.png', 'file2.png', 'file2.png', 'file3.png', 'file4.png', 'file5.png', 'file6.png', 'file7.png', 'file8.png', 'file9.png', 'file10.png', 'file11.png', ]
    console.log(this.Archivos);
    
    return this.Archivos.toString();
  }
}
