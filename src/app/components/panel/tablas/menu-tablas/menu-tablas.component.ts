import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-menu-tablas',
  templateUrl: './menu-tablas.component.html',
  styleUrls: ['./menu-tablas.component.css']
})
export class MenuTablasComponent implements OnInit{

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.actualizarActiveLiOrder1('tablas');
    this.dataService.actualizarActiveLiOrder2('');
  }
}
