import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Indicador } from 'src/app/models/modelos-generales/indicador.model';
import { PermisoPeticion } from 'src/app/models/modelosSeguridad/perfil.model';
import { LoginService } from 'src/app/services/login.service';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { PerfilService } from 'src/app/services/serviciosSeguridad/perfil.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-indicador-table',
  templateUrl: './indicador-table.component.html',
  styleUrls: ['./indicador-table.component.css']
})
export class IndicadorTableComponent implements OnInit{

  indicadores: Indicador[] = [];
  @Input() IdSubCriterio = "";
  @Input() redireccionRol: any;
  selectedIndicador: any;

  constructor(private indicadorService: IndicadorService,
              private perfilService: PerfilService,
              private loginService: LoginService,
              private route: Router)
  { }

  ngOnInit(): void {
    const permisoParams: PermisoPeticion = {
      codigoModelo: this.loginService.getTokenDecoded().modelo,
      codigoPerfil: this.loginService.getTokenDecoded().perfil,
      codigoEstado: 'A',
      codigoSistema: environment.NOMBRE_SISTEMA
    }
    this.getData(permisoParams);
  }

  getData(permisoParams: PermisoPeticion){
    const permission$ = this.perfilService.getPermisos(permisoParams).pipe(data => data)
    const indicator$ = this.indicadorService.getIndicador().pipe(data =>  data)//Cambiar a get by id subcriterio
    forkJoin([permission$, indicator$]).subscribe(([permissionsData, indicatorsData]) => {
      this.indicadores = indicatorsData.filter(i=>permissionsData.some(p=>p.codigoPermiso===i.CodigoIndicador))
    })
  }

  handleRowClick(indicador: any) {
    this.selectedIndicador = indicador;
    console.log(this.redireccionRol);
    
    switch(this.redireccionRol) {
      case 1:
        this.route.navigate(['panel/encargado/asignar-usuarios', this.selectedIndicador]);
        break;
      case 2:
        this.route.navigate(['panel/supervisor/revision-evidencia', this.selectedIndicador]);
        break;
      case 3:
        this.route.navigate(['panel/evidencias/indicador-evidencia', this.selectedIndicador]);
        break;
      default:
        return
    }
  }
  
}
