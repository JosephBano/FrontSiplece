import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleBarService } from 'src/app/services/toggle-bar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy{
  subscription!: Subscription;
  toggleState!: boolean;
  
  activeli: number = 0;

  tablasList: boolean = false;

  constructor(private toggleService: ToggleBarService) {
    this.subscription = this.toggleService.toggle$.subscribe(state => {
      this.toggleState = state;
    });
  }

  toggleTablaList() {
    setTimeout(() => {
      this.tablasList = !this.tablasList;
    }, 1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggle(): void {
    this.toggleService.toggle();
  }

  setActive(tabIndex: number) {
    this.activeli = tabIndex;
  }
}
