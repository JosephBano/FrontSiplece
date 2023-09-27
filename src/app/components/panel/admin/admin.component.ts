import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { DataService } from 'src/app/services/data.service';
import { Sidebar } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  Usuarios: Usuario[] = [];
  
  agregarEncargado!: FormGroup;

  filter!: string;


  constructor(
    private bar: Sidebar,
    private usuarios: UsuarioService,
    private fb: FormBuilder,
    private ds: DataService,
  ) { 
    this.agregarEncargado = this.fb.group({
      nombre: '',
    })
  }

  ngOnInit(): void {
    this.bar.actualizarActiveLiOrder1('admin');
    this.loadData();
  }

  loadData(): void {
    this.usuarios.getUsuarios().subscribe(
      (data) => {
        this.Usuarios = data;
      }
    )
  }

  asignarRolesHandler(usuario: Usuario):void {

  }
}
