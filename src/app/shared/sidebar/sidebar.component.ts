import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sidebar } from '../../services/sidebar.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

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
    private Sidebar: Sidebar,
    private loginService: LoginService,
    private route: Router,
    ) {
    this.subscription = this.Sidebar.toggle$.subscribe(state => {
      this.toggleState = state;
    });
  }
  
  ngOnInit(): void {
    this.Sidebar.getActiveLiOrder1().subscribe(
      (data) => {
        this.activeli = data;
        this.setActive();
      }
    )
    this.Sidebar.getActiveLiOrder2().subscribe(
      (data) => {
        this.activeSubli = data;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggle(): void {
    this.Sidebar.toggle();
  }

  setActive() {
    if(this.activeli === 'tablas') {
      this.tablasList = true;
    }
    else {
      this.tablasList = false;
      this.Sidebar.actualizarActiveLiOrder2('');
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

  logout(){
    this.loginService.removeLocalStorage();
    this.route.navigate(["/inicio"]);
  }
}
