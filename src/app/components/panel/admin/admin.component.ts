import { Component, OnInit } from '@angular/core';
import { Sidebar } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  constructor(
    private bar: Sidebar,
  ) { }

  ngOnInit(): void {
    this.bar.actualizarActiveLiOrder1('admin');
  }
}
