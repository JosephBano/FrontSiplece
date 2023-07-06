import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToggleBarService } from 'src/app/services/toggle-bar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy, OnInit{
  subscription!: Subscription;
  toggleState!: boolean;
  
  activeli: string = '';
  activeSubli: string = '';

  tablasList: boolean = false;

  constructor(
    private toggleService: ToggleBarService,
    private route: Router,
    ) {
    this.subscription = this.toggleService.toggle$.subscribe(state => {
      this.toggleState = state;
    });
  }
  ngOnInit(): void {
    this.route.navigate(['/panel']);
    this.activeli = 'inicio';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggle(): void {
    this.toggleService.toggle();
  }

  setActive(tabIndex: string, tabSubIndex: string) {
    if(tabIndex !== '') this.activeli = tabIndex;
    this.activeSubli = tabSubIndex;
    if(tabIndex !== 'tablas' && tabIndex !== '') this.tablasList = false;
    else if(tabIndex === 'tablas') this.tablasList = !this.tablasList;
    else this.tablasList = true;
  }
}
