import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
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
    private login: LoginService,
    )
    { }

  toggle(): void {
    this.toggleService.toggle();
  }

  ngOnInit(): void {
    this.strname = this.login.getTokenDecoded().nombre;
  }
  
}
