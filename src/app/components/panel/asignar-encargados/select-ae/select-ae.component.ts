import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-select-ae',
  templateUrl: './select-ae.component.html',
  styleUrls: ['./select-ae.component.css']
})
export class SelectAEComponent implements OnInit{

  constructor(private ds: DataService) { }
  ngOnInit(): void {
    this.ds.actualizarActiveLiOrder1('encargado');
  }
}
