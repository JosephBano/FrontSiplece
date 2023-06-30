import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleBarService } from 'src/app/services/toggle-bar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy{
  activeIndex: number | null = null;
  activeList: 'top' | 'bottom' | null = null;
  subscription!: Subscription;
  toggleState!: boolean;

  itemsTop = [
    { name: 'Institucion', icon: 'fa-sharp fa-solid fa-house', href: '/panel/institucion' },
    { name: 'Modelo', icon: 'fa-sharp fa-solid fa-list', href: '/panel/modelo', alert: true },
    { name: 'Criterio', icon: 'fa-sharp fa-solid fa-book', href: '/panel/criterio' },
    { name: 'Sub-Criterio', icon: 'fa-sharp fa-solid fa-trash', href: '/panel/subcriterio' },
    { name: 'Indicadores', icon: 'fa-sharp fa-solid fa-user-pen', href: '/panel/indicador' },
  ];

  itemsBottom = [
    { name: 'Settings', icon: 'fa-sharp fa-solid fa-gear', href: '/panel' },
    { name: 'Log Out', icon: 'fa-sharp fa-solid fa-inbox-out', href: '/panel' },
  ];

  constructor(private toggleService: ToggleBarService) {
    this.subscription = this.toggleService.toggle$.subscribe(state => {
      this.toggleState = state;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClick(index: number, list: 'top' | 'bottom') {
    this.activeIndex = index;
    this.activeList = list;
  }

  toggle(): void {
    this.toggleService.toggle();
  }
}
