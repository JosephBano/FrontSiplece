import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-asignar-encargados',
  templateUrl: './asignar-encargados.component.html',
  styleUrls: ['./asignar-encargados.component.css']
})
export class AsignarEncargadosComponent implements OnInit{

  constructor( private sidebar: DataService) { }

  ngOnInit(): void {
    this.sidebar.actualizarActiveLiOrder1('encagados');
  }
}