import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sidebar } from '../../services/sidebar.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

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
  adminList: boolean = false;
  variableCompartida!: string;

  supervisorActive: boolean = false;
  encargadoActive: boolean = false;
  administradorActive: boolean = false; 

  constructor(
    private Sidebar: Sidebar,
    private loginService: LoginService,
    private dataService: DataService,
    private route: Router,
    ) {
    this.subscription = this.Sidebar.toggle$.subscribe(state => {
      this.toggleState = state;
    });
  }
  
  ngOnInit(): void {
    this.SetInitialRols();
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

  SetInitialRols() {
    const perfil = this.dataService.nombrePerfil();
    if(perfil === 'SUPADMIN') {
      this.administradorActive = true;
      this.encargadoActive = true;
      this.supervisorActive = true;
    }
    if(perfil === 'ADMIN') this.encargadoActive = true;
    if(perfil === 'SUPERVISOR') this.supervisorActive = true;
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

  Subli1ToggleHandler() {
    if(this.adminList) {
      this.adminList = false;
    }
    else{
      if(this.activeli === 'admin') {
        this.adminList = true;
      }
    }
  }

  logout(){
    this.loginService.removeLocalStorage();
    this.route.navigate(["/inicio"]);
  }
}
