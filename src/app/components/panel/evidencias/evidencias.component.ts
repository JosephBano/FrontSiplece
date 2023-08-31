import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-evidencias',
  templateUrl: './evidencias.component.html',
  styleUrls: ['./evidencias.component.css']
})
export class EvidenciasComponent implements OnInit {

  constructor (
    private ds:DataService,
  ) { }

  ngOnInit(): void {
    this.ds.actualizarActiveLiOrder1('evidencias');
  }

}
