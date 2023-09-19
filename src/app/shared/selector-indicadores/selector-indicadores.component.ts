import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Criterio } from 'src/app/models/modelos-generales/criterio.model';
import { SubCriterio } from 'src/app/models/modelos-generales/subCriterio.model';
import { CriteriosService } from 'src/app/services/modeloServicios/criterios.service';
import { ModeloService } from 'src/app/services/serviciosSeguridad/modelo.service';
import { SubCriteriosService } from 'src/app/services/modeloServicios/sub-criterios.service';
import { LoginService } from 'src/app/services/login.service';
import { PerfilService } from 'src/app/services/serviciosSeguridad/perfil.service';
import { PermisoPeticion, PermisoRespuesta } from 'src/app/models/modelosSeguridad/perfil.model';
import { environment } from 'src/environments/environment.development';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-selector-indicadores',
  templateUrl: './selector-indicadores.component.html',
  styleUrls: ['./selector-indicadores.component.css']
})
export class SelectorIndicadoresComponent {
  selects: FormGroup;
  @Input() componenteRol: any; //Manejara el tipo de detalle al que redireccionara el indicador.

  criterios: Criterio[] = [];
  subCriterios: SubCriterio[] = [];
  permisos: PermisoRespuesta[]=[];

  modeloId!: string;
  criterioId!: string;
  subcriterioId!: string;

  disabledButton = true;
  displayIndicador = false;

  TitlePage: string = 'Componente';
  
  constructor(private fb: FormBuilder,
              private modeloService: ModeloService,
              private criterioService: CriteriosService,
              private subcriterioService: SubCriteriosService,
              private loginService: LoginService,
              private perfilService: PerfilService
              ) {
    this.selects = this.fb.group({
      criterio: new FormControl({value: '', disabled: false}),
      subcriterio: new FormControl({value: '', disabled: true}),
    })
  }

  ngOnInit(): void {
    this.TitlePageHandler();
    const nameInstitution = this.loginService.getTokenDecoded()['cod-institucion'];
    const permisoParams: PermisoPeticion = {
      codigoModelo: this.loginService.getTokenDecoded().modelo,
      codigoPerfil: this.loginService.getTokenDecoded().perfil,
      codigoEstado: 'A',
      codigoSistema: environment.NOMBRE_SISTEMA
    }
    this.getData(permisoParams);
  }

  TitlePageHandler(): void {
    if(this.componenteRol === 1) this.TitlePage = 'Subida de Evidencias'; 
    if(this.componenteRol === 2) this.TitlePage = 'Supervisor'; 
    if(this.componenteRol === 3) this.TitlePage = 'Encargado'; 
  }

  getData(permisoParams: PermisoPeticion){
    const permission$ = this.perfilService.getPermisos(permisoParams).pipe(data => data)
     
    const data$ = this.modeloService.getModeloByCode(this.loginService.getTokenDecoded().modelo).pipe(
      switchMap((data) => {
        this.modeloId = data.idModelo!;
        const criterio$ = this.criterioService.getByModelo(this.modeloId);
        const subCriterio$ = this.subcriterioService.getSubCriterio();
        return forkJoin([criterio$, subCriterio$]);
      })
    )
  
    forkJoin([permission$, data$]).subscribe(([permissionsData, [criteriosData, subCriteriosData]]) => {
      this.criterios=criteriosData.filter(c=>permissionsData.some(p=>p.codigoPermiso===c.CodigoCriterio))
      this.subCriterios = subCriteriosData.filter(sc=>permissionsData.some(p=>p.codigoPermiso===sc.CodigoSubCriterio))
    });
  }

  criterioChange(){
    this.displayIndicador = false;
    this.criterioId = this.selects.get('criterio')?.value;
    if (this.criterioId) {
      this.selects.get('subcriterio')?.enable();
      this.selects.get('subcriterio')?.setValue('');
    } else {
      this.selects.get('subcriterio')?.disable();
    }
    this.subcriterioChange();
  }

  subcriterioChange() {
    this.displayIndicador = false;
    this.subcriterioId = this.selects.get('subcriterio')?.value;
    if(this.subcriterioId !== '') {
      this.disabledButton = false;
    } else {
      this.disabledButton = true;
      this.selects.get('subcriterio')?.setValue('')
    }
  }

  onSubmit() {
    this.displayIndicador = true;
  }
}
