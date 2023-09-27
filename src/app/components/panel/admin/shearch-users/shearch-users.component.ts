import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  
  agregarEncargado!: FormGroup;
  perfil!: FormGroup;

  filter!: string;
  mostrarUsuarios: boolean = false;
  statfilter: string = '';

  constructor(
    private usuarios: UsuarioService,
    private fb: FormBuilder,
    private ds: DataService,
  ) { 
    this.agregarEncargado = this.fb.group({
      nombre: '',
    })
    this.perfil = this.fb.group({
      perfil: '0',
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


  ChangeVisibilityUsers() {
    console.log('selected');
    
    this.mostrarUsuarios = true;
  }
}
