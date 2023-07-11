import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit{

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.actualizarActiveLiOrder1('configuracion');
  }
}
