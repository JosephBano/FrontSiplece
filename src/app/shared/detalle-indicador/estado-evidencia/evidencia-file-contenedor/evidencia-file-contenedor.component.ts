import { Component, Input, OnInit } from '@angular/core';
import { ArchivoEvidencia } from '../../../../models/modelos-generales/archivo-evidencia.model';
import { ArchivoEvidenciaService } from 'src/app/services/modeloServicios/archivo-evidencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-evidencia-file-contenedor',
  templateUrl: './evidencia-file-contenedor.component.html',
  styleUrls: ['./evidencia-file-contenedor.component.css']
})
export class EvidenciaFileContenedorComponent implements OnInit{
  @Input() IdEvidencia: any;
  
  Archivos: ArchivoEvidencia[] = [];
  radiobuton!: FormGroup;
  formDisabled: boolean[] = [];
  formStatus: string[] = [];
  
  //rolviewradios = '1';
  //rolviewradios = '2';
  @Input() rolviewradios: any;

  constructor(
    private archivoService: ArchivoEvidenciaService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService
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
      this.formDisabled = new Array(this.Archivos.length).fill(false);
      this.formStatus = new Array(this.Archivos.length).fill('btnWait');
    });
  }

  sendValidated(i:number){    
    console.log(this.radiobuton.value.estado);
    if(this.radiobuton.value.estado!=='0'){
      this.formDisabled[i]=true;
      this.formStatus[i]=this.getClassStyle(this.radiobuton.value.estado);
      this.updateStatus(i,this.radiobuton.value.estado);
      this.radiobuton.value.estado='0';
    }
  }

   getClassStyle(value: string): string{
    if(value==='0'){
      return 'btnWait'
    }
    if(value==='1'){
      return 'btnDisapprove'
    }
    return 'btnApprove'
  }
  async updateStatus(index:number,value: string): Promise<void>{
    const fileUpdate: ArchivoEvidencia = {
      IdArchivoEvidencia:this.Archivos[index].IdArchivoEvidencia,
      IdEvidencia:this.Archivos[index].IdEvidencia,
      IdPeriodo:this.Archivos[index].IdPeriodo,
      Estado:value,
      FechaRegistro:this.Archivos[index].FechaRegistro,
      FechaValidacion:this.obtenerFechaEnFormato(),
      UsuarioRegistra:this.Archivos[index].UsuarioRegistra,
      RolValida:this.Archivos[index].RolValida,
      Detalle:this.Archivos[index].Detalle,
      PathUrl:this.Archivos[index].PathUrl,
      Activo:this.Archivos[index].Activo
    }
    console.log(fileUpdate);
    
    try{
      this.archivoService.UpdateArchivo(fileUpdate).subscribe(data=>{
        if(data.Estado==value){
          this.toastr.success("Archivo evaluado con exito");
        }
      });
    }catch(error){ 
        this.toastr.error("Error al evaluar el archivo");
    }
  }
  obtenerFechaEnFormato() {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0'); 
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');

  
    return `${anio}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;
  }
}
