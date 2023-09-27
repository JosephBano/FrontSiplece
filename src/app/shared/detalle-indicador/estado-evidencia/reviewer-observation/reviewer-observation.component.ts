import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ArchivoEvidencia } from 'src/app/models/modelos-generales/archivo-evidencia.model';
import { PermisoPeticion } from 'src/app/models/modelosSeguridad/perfil.model';
import { LoginService } from 'src/app/services/login.service';
import { ArchivoEvidenciaService } from 'src/app/services/modeloServicios/archivo-evidencia.service';
import { PerfilService } from 'src/app/services/serviciosSeguridad/perfil.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-reviewer-observation',
  templateUrl: './reviewer-observation.component.html',
  styleUrls: ['./reviewer-observation.component.css']
})
export class ReviewerObservationComponent {
  archivoEvidencia: ArchivoEvidencia[] = new Array<ArchivoEvidencia>();
  permisoParams!: PermisoPeticion;
  
  constructor(public archivosEvidenciaService: ArchivoEvidenciaService,
              public perfilService: PerfilService,
              public loginService: LoginService){}

  ngOnInit(){
    this.permisoParams = {
      codigoModelo: this.loginService.getTokenDecoded().modelo,
      codigoPerfil: this.loginService.getTokenDecoded().perfil,
      codigoEstado: 'A',
      codigoSistema: environment.NOMBRE_SISTEMA
    }
  }

  loadFilesEvidence(IdEvidencia: string) {
    const filesEvidence$ = this.archivosEvidenciaService.GetByEvidencia(IdEvidencia).pipe(data => data);
    const permission$ = this.perfilService.getPermisos(this.permisoParams).pipe(data => data)

    forkJoin([permission$,filesEvidence$]).subscribe(([permissionData, fileData]) => {
      this.archivoEvidencia = fileData.filter(f=>f.IdEvidencia===IdEvidencia);
    })
  }
}
