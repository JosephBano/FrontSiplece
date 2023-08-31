import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { ToggleBarService } from 'src/app/services/toggle-bar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  
  strname: string = ''; 
  
  constructor(
    private toggleService: ToggleBarService,
    private gdata: GlobalDataService,
    )
    { }

  toggle(): void {
    this.toggleService.toggle();
  }

  ngOnInit(): void {
    this.gdata.getNombreUsuario().subscribe(
      (data) => {
        this.strname = data;
      }
    );
  }
  
}
