import { Component, Input, OnInit } from '@angular/core';
import { ArchivoEvidencia } from '../../../../models/modelos-generales/archivo-evidencia.model';
import { ArchivoEvidenciaService } from 'src/app/services/modeloServicios/archivo-evidencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

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
    private loginService: LoginService,
  ) {
    this.radiobuton = this.fb.group({
      estado: ['0', [Validators.required]] 
    })
   }

  ngOnInit(): void {
    this.data()
  }

  data(): void {
    this.archivoService.GetByEvidenciaUser(this.IdEvidencia,this.loginService.getTokenDecoded().usuarioRegistra).subscribe(data =>{
      this.Archivos = data
    });
  }
}
