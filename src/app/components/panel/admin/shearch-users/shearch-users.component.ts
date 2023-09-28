import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { DataService } from 'src/app/services/data.service';
import { UsuarioService } from 'src/app/services/usuario.service';

const inputText = document.getElementById('nombre') as HTMLInputElement;

@Component({
  selector: 'app-shearch-users',
  templateUrl: './shearch-users.component.html',
  styleUrls: ['./shearch-users.component.css', './../admin.component.css']
})
export class ShearchUsersComponent {
  Usuarios: Usuario[] = [];
  UsuariosSelected!: Usuario;
  Perfiles: any[]=[{rol:'SUPERVISOR',id:1}, {rol:'ADMIN', id:2}, {rol:'ENCARGADO', id:3}, {rol:'SUPADMIN',id:4}];
  
  valueEncargadoFilter: string = '';
  valuePerfilFilter: string = '';

  mostrarUsuarios: boolean = false;
  statfilter: string = '';

  selects: FormGroup;
  disabledButton = true;
  displayPermissions = false;

  constructor(
    private usuarios: UsuarioService,
    private fb: FormBuilder,
    private ds: DataService,
  ) { 
    this.selects = this.fb.group({
      filterEncargado: new FormControl({value: '0', disabled: false}),
      filterPerfil: new FormControl({value: '0', disabled: true})
    })
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.usuarios.getUsuarios().subscribe(
      (data) => {
        this.Usuarios = data;
      }
    )
  }

  OnChangeEncargadoFilter() {
    this.displayPermissions = false;
    this.valueEncargadoFilter = this.selects.get('filterEncargado')?.value;
    if(this.valueEncargadoFilter!=='0') {      
      this.selects.get("filterPerfil")?.enable();
      this.selects.get("filterPerfil")?.setValue('0');
    } else {
      this.selects.get("filterPerfil")?.disable();
    }
    this.OnChangePerfilFilter();
  }
  OnChangePerfilFilter() {
    this.displayPermissions = false;
    this.valuePerfilFilter = this.selects.get('filterPerfil')?.value;
        
    if(this.valuePerfilFilter === '0' || this.valueEncargadoFilter === '0') {
      this.disabledButton = true;
      this.selects.get('filterPerfil')?.setValue('')
    } else {
      this.disabledButton = false;
    }
  }

  pressTrashEncargado(){
    this.selects.get('filterEncargado')!.setValue('0'); 
    this.valueEncargadoFilter = '0'; 
    this.disabledButton = true;
    this.selects.get("filterPerfil")?.disable();
  }
  pressTrashPerfil(){
    this.selects.get('filterPerfil')!.setValue('0');
    this.valuePerfilFilter = '0'; 
    this.disabledButton = true;
  }

  ChangeVisibilityUsers() {
    console.log('selected');
    
    this.mostrarUsuarios = true;
  }

  notIsCeroValidator(control: FormControl) {
    if (control.value === 0) {
      return { noEsCero: true };
    }
    return null;
  }  

  onSubmit() { 
    this.displayPermissions = true;
  }
}
