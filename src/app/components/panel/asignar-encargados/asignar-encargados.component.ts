import { Component, OnInit } from '@angular/core';
import { Sidebar } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-asignar-encargados',
  templateUrl: './asignar-encargados.component.html',
  styleUrls: ['./asignar-encargados.component.css']
})
export class AsignarEncargadosComponent implements OnInit{

  constructor( private sidebar: Sidebar) { }

  ngOnInit(): void {
    this.sidebar.actualizarActiveLiOrder1('encagados');
  }
}