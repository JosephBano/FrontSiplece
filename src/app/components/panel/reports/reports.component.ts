import { Component, OnInit } from '@angular/core';
import { Sidebar } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(
    private bar: Sidebar
  ) { }

  ngOnInit(): void {
    this.bar.actualizarActiveLiOrder1('report')
  }
}
