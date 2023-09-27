import { Component, OnInit } from '@angular/core';
import { Sidebar } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-menu-tablas',
  templateUrl: './menu-tablas.component.html',
  styleUrls: ['./menu-tablas.component.css']
})
export class MenuTablasComponent implements OnInit{

  Contenedores = [
    {url: 'criterio', titulo: 'Criterios', icono: 'description'},
    {url: 'subcriterio', titulo: 'Sub-Criterios', icono: 'inventory_2'},
    {url: 'indicador', titulo: 'Indicadores', icono: 'list'},
    {url: 'elementos', titulo: 'Elementos Fundamentales', icono: 'category'},
    {url: 'evidencia', titulo: 'Evidencias', icono: 'place_item'},
  ]

  constructor(
    private Sidebar: Sidebar,
  ) { }

  ngOnInit(): void {
    this.Sidebar.actualizarActiveLiOrder1('tablas');
    this.Sidebar.actualizarActiveLiOrder2('');
  }
}
