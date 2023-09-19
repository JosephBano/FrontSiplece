import { Component, OnInit } from '@angular/core';
import { Sidebar } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-evidencias',
  templateUrl: './evidencias.component.html',
  styleUrls: ['./evidencias.component.css']
})
export class EvidenciasComponent implements OnInit {

  constructor (
    private ds:Sidebar,
  ) { }

  ngOnInit(): void {
    this.ds.actualizarActiveLiOrder1('evidencias');
  }

}
