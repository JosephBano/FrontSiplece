import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { DataService } from 'src/app/services/data.service';
import { Sidebar } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  appContainerClicked: boolean = false;

  Containers = [
    {url: 'addUsuario', titulo: 'Agregar Usuarios', icono: 'description'},
    {url: 'usuariosList', titulo: 'Lista de Usuarios', icono: 'inventory_2'},

  ]

  constructor(
    private Sidebar: Sidebar,
  ) { }

  ngOnInit(): void {
    this.Sidebar.actualizarActiveLiOrder1('admin');
    this.Sidebar.actualizarActiveLiOrder2('');
  }
}


