import { Component, Input } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { forkJoin, switchMap } from 'rxjs';
import { CriteriosService } from 'src/app/services/modeloServicios/criterios.service';
import { AddPermiso, PermisoPeticion } from 'src/app/models/modelosSeguridad/perfil.model';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment.development';
import { ModeloService } from 'src/app/services/serviciosSeguridad/modelo.service';
import { PerfilService } from 'src/app/services/serviciosSeguridad/perfil.service';
import { NodoArbol, ListaPermisoRespuesta, NodoFlat } from 'src/app/models/modelosSeguridad/permission.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubCriteriosService } from 'src/app/services/modeloServicios/sub-criterios.service';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { ElementoFundamentalService } from 'src/app/services/modeloServicios/elemento-fundamental.service';
import { EvidenciaService } from 'src/app/services/modeloServicios/evidencia.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-permission-table',
  templateUrl: './permission-table.component.html',
  styleUrls: ['./permission-table.component.css']
})
export class PermissionTableComponent {
  @Input() IdRol?:string;
  @Input() IdUser?:string;
  permisoParams?: PermisoPeticion;
  assignablePermissions: ListaPermisoRespuesta[] = new Array<ListaPermisoRespuesta>();
  menuList:NodoArbol[]=[];
  disabledButton=true;
  addPermissions: string[] = [];
  addPermissionsList: string = '';
  permissionForm: FormGroup;
  
  constructor(
    private criterioService: CriteriosService,
    private subcriterioService: SubCriteriosService,
    private indicadorService: IndicadorService,
    private elementoFundamentalService: ElementoFundamentalService,
    private evidenciaService: EvidenciaService,
    private loginService: LoginService,
    private perfilService: PerfilService,
    private modeloService: ModeloService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.permissionForm = this.fb.group({
      selectedRolOption: 'ENCARGADO',
      listPermision: ''
    })
  }

  ngOnInit(){
    this.permisoParams = {
      codigoModelo: this.loginService.getTokenDecoded().modelo,
      codigoPerfil: '',
      codigoEstado: 'A',
      codigoSistema: environment.NOMBRE_SISTEMA
    }
    this.loadUserData()
  }

  loadUserData(){
    if(this.IdRol!=='ASIGNAR ROL'){   
      this.permisoParams!.codigoPerfil=this.IdRol!;
      this.permissionForm.get('selectedRolOption')?.setValue(this.IdRol);
      console.log("Ya tiene rol");
      //console.log(this.permisoParams);
    }else{
      //crea nuevo rol     
    }
    const permission$ = this.perfilService.getPermisos(this.permisoParams!).pipe(data=>data);
    const data$ = this.modeloService.getModeloByCode(this.permisoParams?.codigoModelo!).pipe(
      switchMap((data)=>{
        const component$ = this.criterioService.getAllByModelo(data.idModelo!).pipe(data=>data);
        return forkJoin([component$])
      }
    ))
    forkJoin([permission$, data$]).subscribe(([permissionData, [componentData]]) => {
      const listBasicPermission = componentData.filter(c=>permissionData.some(p=>c.Codigo===p.codigoPermiso))
      
      this.getPermissionBasic(listBasicPermission,componentData)
      this.getUserData()
    })
  }

  getPermissionBasic(list: ListaPermisoRespuesta[],all: ListaPermisoRespuesta[]){
    const noDelete: ListaPermisoRespuesta[]=[]
    list.forEach(l=>{
      if(l.Padre!==null){
        all.forEach(a=>{
          if(noDelete.length===0 && l.Padre===a.Codigo){
            noDelete.push(a)
          }
          else{
            noDelete.forEach(r=>{
              if(l.Padre===a.Codigo && r.Codigo!==a.Codigo){
                noDelete.push(a)
              }
            })
          }
        })
      }
    })
    const res:ListaPermisoRespuesta[] = list.filter(l=>!noDelete.some(nd=>l.Codigo===nd.Codigo))
    this.assignablePermissions = all.filter(c=>!res.some(p=>c.Codigo===p.Codigo))
  }

  getUserData(){
    this.menuList=[]
    this.assignablePermissions.forEach(ap=>{
      this.getPadre(ap);
      this.getHijo(ap);
    })
    this.dataSource.data = this.menuList;
  }

  getPadre(item: ListaPermisoRespuesta){
    if(item.Codigo?.includes('C-',0) && !item.Codigo?.includes('C-',1))
      this.menuList.push(this.createNuevoNodo(item))
  }
  getHijo(item: ListaPermisoRespuesta){
    switch(item.Codigo!==null){
      case item.Codigo?.includes('SC-',0) && !item.Codigo?.includes('SC-',1):
        this.menuLv2(item,this.menuList)
        break;
      case item.Codigo?.includes('I-',0) && !item.Codigo?.includes('I-',1):
        this.menuLv3(item,this.menuList)
        break;
      case item.Codigo?.includes('EF-',0) && !item.Codigo?.includes('EF-',1):
        this.menuLv4(item,this.menuList)
        break;
      case item.Codigo?.includes('E-',0) && !item.Codigo?.includes('E-',1):
        this.menuLv5(item,this.menuList)
        break;
      default:
        break;
    }
  }

  menuLv2(item:ListaPermisoRespuesta, menuList: NodoArbol[]){  
    menuList.forEach(m=>{
      if(m.value.Codigo===item.Padre){
        m.children?.push(this.createNuevoNodo(item));
      }
    });
  }
  menuLv3(item:ListaPermisoRespuesta, menuList:NodoArbol[]){
    menuList.forEach(m=>{
      this.menuLv2(item,m.children!)
    })
  }
  menuLv4(item:ListaPermisoRespuesta, menuList:NodoArbol[]){
    menuList.forEach(m=>{
      this.menuLv3(item,m.children!)
    })
  }
  menuLv5(item:ListaPermisoRespuesta, menuList:NodoArbol[]){
    menuList.forEach(m=>{
      this.menuLv4(item,m.children!)
    })
  }

  createNuevoNodo(value: ListaPermisoRespuesta):NodoArbol {
    const nuevoNodo: NodoArbol = {
      value:value,
      children: []
    }
    return nuevoNodo;
  }

  childElement(elementCode: string){
    this.disabledButton=false
    const res=this.addPermissions.find(ap=>ap===elementCode);
    if(res===undefined){
      this.addPermissions.push(elementCode);
      this.permissionForm.get('listPermision')?.setValue(this.addPermissionsList);
    }
  }

  onSubmit() { 
    const observables=this.addPermissions.map(ap=>{
      switch(ap!==null){
        case ap.includes('C-',0) && !ap.includes('C-',1):        
          return this.criterioService.getChild(ap);
        case ap.includes('SC-',0) && !ap.includes('SC-',1):
          const scC$ = this.subcriterioService.getChild(ap).pipe(sc=>sc);     
          const scF$ = this.subcriterioService.getFather(ap).pipe(sc=>sc); 
          return forkJoin([scC$,scF$]);
        case ap.includes('I-',0) && !ap.includes('I-',1):
          const iC$ = this.indicadorService.getChild(ap).pipe(i=>i)     
          const iF$ = this.indicadorService.getFather(ap).pipe(i=>i) 
          return forkJoin([iC$,iF$]);
        case ap.includes('EF-',0) && !ap.includes('EF-',1):
          const efC$ = this.elementoFundamentalService.getChild(ap).pipe(ef=>ef)     
          const efF$ = this.elementoFundamentalService.getFather(ap).pipe(ef=>ef) 
          return forkJoin([efC$,efF$]);
        case ap.includes('E-',0) && !ap.includes('E-',1):   
          return this.evidenciaService.getFather(ap);
        default:
          return
      }
    })
    forkJoin(observables).subscribe(results => {
      results.forEach(result => {
        if (Array.isArray(result) && result.length === 2) {
          const [listChild, listFather] = result;
          console.log('Resultado ListChild:', listChild[0].listP);
          console.log('Resultado ListFather:', listFather[0].listP);
          this.addPermissions.push(listChild[0].listP)
          this.addPermissions.push(listFather[0].listP)
        } else if (Array.isArray(result) && result.length === 1) {
          const listChild = result[0];
          console.log('Resultado ListChild:', listChild.listP);
          this.addPermissions.push(listChild.listP)
        }
      });
      
      this.addPermissions.forEach((r,i:number)=>{       
        if(i===0){
          this.addPermissionsList+=r+',';
        }else{
          this.addPermissionsList=this.combinarCadenas(r,this.addPermissionsList);
        }
      })
      console.log(this.addPermissionsList)
      const addPermiso: AddPermiso = {
        CodigoPerfil:this.permissionForm.get('selectedRolOption')?.value,
        CodigoUsuario:this.IdUser!,
        CodigoInstitucion:this.loginService.getTokenDecoded()['cod-institucion'],
        CodigoSistema: this.loginService.getTokenDecoded().sistema,
        ListCodigoOpciones: this.addPermissionsList
      }
      try{
        this.perfilService.addPermisos(addPermiso).subscribe(data=>{
          if(data[0]===1){
            this.toastr.success("Permisos agregados con exito");
          }
        });
      }catch(error){ 
        this.toastr.error("Error al asignar permisos al usuario");
      }
    });
  }

  combinarCadenas(cadena1: string, cadena2: string): string {
    if(cadena1===null || cadena2===null){
      if(cadena1===null){
        return cadena2;
      }
      if(cadena2===null){
        return cadena1;
      }
    } else {
      const arreglo1 = cadena1.split(',');
      const arreglo2 = cadena2.split(',');
      const conjunto = new Set([...arreglo1, ...arreglo2]);
      const cadenaCombinada = Array.from(conjunto).join(',');
      return cadenaCombinada;
    }
    return ''
  }

  obtenerTodosLosHijos(nodo: NodoArbol): ListaPermisoRespuesta[] {
    const todosLosHijos: ListaPermisoRespuesta[] = [];

    const recorrer = (nodo: NodoArbol) => {
      todosLosHijos.push(nodo.value);
      if (nodo.children) {
          for (const child of nodo.children) {
              recorrer(child);
          }
      }
    };

    return todosLosHijos;
  }

  recorrerTodosLosHijos(nodos: NodoArbol[], code:string): ListaPermisoRespuesta[] {
    let todosLosHijos: ListaPermisoRespuesta[] = [];

    const recorrer = (nodos: NodoArbol[]) => {
      for (const nodo of nodos) {
        
        if(nodo.value.Codigo===code){
          console.log(nodo);
          
          todosLosHijos = this.obtenerTodosLosHijos(nodo)
        }
        if (nodo.children) {
            recorrer(nodo.children);
        }
      }
    };
    
    recorrer(nodos);
    return todosLosHijos;
  }
  searchChilds(code: string){
    this.recorrerTodosLosHijos(this.menuList,code)
  }

  /********************************************/
  private _transformer = (node: NodoArbol, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      value:node.value,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<NodoFlat>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: NodoFlat) => node.expandable;
}