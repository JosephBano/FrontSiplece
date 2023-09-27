import { Component, OnInit } from '@angular/core';
import { Sidebar } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-select-ae',
  templateUrl: './select-ae.component.html',
  styleUrls: ['./select-ae.component.css']
})
export class SelectAEComponent implements OnInit{

  constructor(private ds: Sidebar) { }
  ngOnInit(): void {
    this.ds.actualizarActiveLiOrder1('encargado');
  }
}
