import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-check-manager',
  templateUrl: './check-manager.component.html',
  styleUrls: ['./check-manager.component.css']
})
export class CheckManagerComponent implements OnInit{

  constructor (
    private ds: DataService
  ) {}
  ngOnInit(): void {
    this.ds.actualizarActiveLiOrder1('checkmanager')
  }

}
