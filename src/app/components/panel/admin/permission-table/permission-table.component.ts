import { Component, Input } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { forkJoin, switchMap } from 'rxjs';
import { CriteriosService } from 'src/app/services/modeloServicios/criterios.service';
import { PermisoPeticion } from 'src/app/models/modelosSeguridad/perfil.model';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment.development';
import { ModeloService } from 'src/app/services/serviciosSeguridad/modelo.service';
import { PerfilService } from 'src/app/services/serviciosSeguridad/perfil.service';
import { NodoArbol, ListaPermisoRespuesta, NodoFlat } from 'src/app/models/modelosSeguridad/permission.model';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  permissionForm: FormGroup;
  
  constructor(
    private criterioService: CriteriosService,
    private loginService: LoginService,
    private perfilService: PerfilService,
    private modeloService: ModeloService,
    private fb: FormBuilder
  ) {
    this.permissionForm = this.fb.group({
      selectedRolOption: 'ENCARGADO',
      listPermision: []
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
      //console.log(this.permisoParams);
    }else{
      //crea nuevo rol
      console.log("Creando nuevo rol ");
    }
    const permission$ = this.perfilService.getPermisos(this.permisoParams!).pipe(data=>data);
    const data$ = this.modeloService.getModeloByCode(this.permisoParams?.codigoModelo!).pipe(
      switchMap((data)=>{
        const component$ = this.criterioService.getAllByModelo(data.idModelo!).pipe(data=>data);
        return forkJoin([component$])
      }
    ))
    forkJoin([permission$, data$]).subscribe(([permissionData, [componentData]]) => {
      //this.assignablePermissions = componentData.filter(c=>!permissionData.some(p=>c.Codigo===p.codigoPermiso))
      const listBasicPermission = componentData.filter(c=>permissionData.some(p=>c.Codigo===p.codigoPermiso))
      /*console.log(permissionData);
      console.log(componentData);
      console.log(listBasicPermission);*/
      
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
    console.log(res);
  }

  getUserData(){
    this.menuList=[]
    this.assignablePermissions.forEach(ap=>{
      this.getPadre(ap);
      this.getHijo(ap);
    })
    
    //console.log(this.menuList);
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
      this.addPermissions.push(elementCode)
    }
  }

  onSubmit() { 
    this.addPermissions.forEach(ap=>{
      switch(ap!==null){
        case ap.includes('C-',0) && !ap.includes('C-',1):
          console.log("c="+ap);
          break;
        case ap.includes('SC-',0) && !ap.includes('SC-',1):
          console.log("sc="+ap);
          break;
        case ap.includes('I-',0) && !ap.includes('I-',1):
          console.log("i="+ap);
          break;
        case ap.includes('EF-',0) && !ap.includes('EF-',1):
          console.log("ef="+ap);
          break;
        case ap.includes('E-',0) && !ap.includes('E-',1):
          console.log("e="+ap);
          break;
        default:
          console.log("ERROR");
          break;
    }})
    
    console.log(this.permissionForm.get('selectedRolOption'));
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