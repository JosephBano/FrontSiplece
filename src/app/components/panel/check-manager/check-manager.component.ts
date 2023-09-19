import { Component, OnInit } from '@angular/core';
import { Sidebar } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-check-manager',
  templateUrl: './check-manager.component.html',
  styleUrls: ['./check-manager.component.css']
})
export class CheckManagerComponent implements OnInit{

  constructor (
    private ds: Sidebar
  ) {}
  ngOnInit(): void {
    this.ds.actualizarActiveLiOrder1('checkmanager')
  }

}
