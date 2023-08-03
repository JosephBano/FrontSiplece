import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-menu-tablas',
  templateUrl: './menu-tablas.component.html',
  styleUrls: ['./menu-tablas.component.css']
})
export class MenuTablasComponent implements OnInit{

  Contenedores = [
    {url: 'modelo', titulo: 'Modelos', icono: 'menu_book'},
    {url: 'criterio', titulo: 'Criterios', icono: 'description'},
    {url: 'subcriterio', titulo: 'Sub-Criterios', icono: 'inventory_2'},
    {url: 'indicador', titulo: 'Indicadores', icono: 'list'},
    {url: 'elemento', titulo: 'Elementos Fundamentales', icono: 'category'},
    {url: 'evidencia', titulo: 'Evidencias', icono: 'place_item'},
  ]

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.actualizarActiveLiOrder1('tablas');
    this.dataService.actualizarActiveLiOrder2('');
  }
}
