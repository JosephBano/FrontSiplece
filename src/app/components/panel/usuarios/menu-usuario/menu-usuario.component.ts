import { Component } from '@angular/core';
import { Sidebar } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})
export class MenuUsuarioComponent {

  Containers = [
    {url: 'usuarios/usuariosList', titulo: 'Lista de Usuarios', icono: 'list'},
    {url: 'usuarios/addUsuario', titulo: 'Agregar Usuarios', icono: 'group_add'},
    {url: 'administrar', titulo: 'Administrar', icono: 'admin_panel_settings'},

  ]

  constructor(
    private Sidebar: Sidebar,
  ) { }

  ngOnInit(): void {
    this.Sidebar.actualizarActiveLiOrder1('admin');
    this.Sidebar.actualizarActiveLiOrder2('');
  }
}

