import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToggleBarService } from 'src/app/services/toggle-bar.service';
import { DataService } from '../../../services/data.service';

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
  variableCompartida!: string;

  constructor(
    private toggleService: ToggleBarService,
    private dataService: DataService,
    private route: Router,
    ) {
    this.subscription = this.toggleService.toggle$.subscribe(state => {
      this.toggleState = state;
    });
  }
  ngOnInit(): void {
    this.dataService.getActiveLiOrder1().subscribe(
      (data) => {
        this.activeli = data;
        this.setActive();
      }
    )
    this.dataService.getActiveLiOrder2().subscribe(
      (data) => {
        this.activeSubli = data;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggle(): void {
    this.toggleService.toggle();
  }

  setActive() {
    if(this.activeli === 'tablas') {
      this.tablasList = true;
    }
    else {
      this.tablasList = false;
      this.dataService.actualizarActiveLiOrder2('');
    }
  }

  activeLogOut(){
    this.activeli = 'logout';
  }

  tablasToggleHandler(){
    if(this.tablasList) {
      this.tablasList = false;
    }
    else{
      if(this.activeli === 'tablas') {
        this.tablasList = true;
      }
    }
  }
}
