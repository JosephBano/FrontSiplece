import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Evidencia } from '../../../../models/modelos-generales/evidencia.model';
import { EvidenciaService } from 'src/app/services/modeloServicios/evidencia.service';
import { ArchivoEvidenciaService } from 'src/app/services/modeloServicios/archivo-evidencia.service';
import { AgregarArchivoRequest, AgregarPathRequest, ObtenerTokenRequest } from 'src/app/models/modelos-generales/sharedPointToken';
import { environment } from 'src/environments/environment.development';
import { switchMap } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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
  usuarioRegister: string="";

  constructor(
    private loginService: LoginService,
    private evidenciaService: EvidenciaService,
    private archivoEvService: ArchivoEvidenciaService,
    private toastr: ToastrService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.usuarioRegister = this.loginService.getTokenDecoded().usuarioRegistra
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.files) {
      this.files = [...this.files, ...Array.from(element.files)];
    }
    element.value = '';
  }

  convertToBase64(file: File): Promise<string> { 
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result.toString().split(',')[1]);
        } else {
          reject(new Error('Error al leer el archivo en base64.'));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
  
  async onUpload() {
    try {
      const fileData = await this.convertToBase64(this.files[0]);
      this.getToken(this.files[0].name,fileData)
      this.router.navigate([`${this.location.path()}`]);
      this.files = []
    } catch (error) {
      this.toastr.error(`Error base 64: {error}`)
    }
  }

  async getToken(fileName: string, filebase: string) {  
    const credentials: ObtenerTokenRequest = {
      GrantType: environment.SHP_API_GRANT_TYPE,
      ApplicationId: environment.SHP_API_APP_ID,
      ClientId: environment.SHP_API_CLIENT_ID,
      ClientSecret: environment.SHP_API_CLIENT_SECRET,
      TenantName: environment.SHP_API_TENANT_NAME,
      RefreshToken: environment.SHP_REFRESH_TOKEN
    }
    this.archivoEvService.GetTokenSharedPoint(credentials).pipe(
      switchMap((tokenAccess: any)=>{
        const addFileBody: AgregarArchivoRequest = {
          TenantName: credentials.TenantName,
          SiteName: environment.SHP_FOLDER_SITE_NAME,
          ListName: environment.SHP_FOLDER_LIST_NAME,
          FileName: fileName,
          FileBase64: filebase,
          AccessToken: tokenAccess["access_token"]
        }
        return this.archivoEvService.AddFileSharedPoint(addFileBody)
      })
    ).subscribe(data => {
      this.updateEvidenceFile(data.PathUrl)
    })
  }

  updateEvidenceFile(pathUrl?: string) {
    const agregarPath: AgregarPathRequest = {
      PathUrl: pathUrl,
      CodigoUsuario: this.usuarioRegister,
      IdEvidencia: this.Evidencias[0].IdEvidencia
    }
    this.toastr.success("Archivo subido a SharedPoint")    
    this.archivoEvService.SaveFile(agregarPath).subscribe(
    );
  }

  openModal() {
    this.evidenciaService.getEvidencia().subscribe(
      (data) => {
        this.Evidencias = data.filter( e => e.IdElemento == this.elemento);
      }
    )
  }
}
