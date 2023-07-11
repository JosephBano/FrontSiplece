import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inicio-panel',
  templateUrl: './inicio-panel.component.html',
  styleUrls: ['./inicio-panel.component.css']
})
export class InicioPanelComponent implements OnInit{

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.actualizarActiveLiOrder1('inicio');
  }

}
