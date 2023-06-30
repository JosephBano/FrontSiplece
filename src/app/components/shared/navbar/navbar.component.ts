import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToggleBarService } from 'src/app/services/toggle-bar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private toggleService: ToggleBarService) { }

  toggle(): void {
    this.toggleService.toggle();
  }
  
}
