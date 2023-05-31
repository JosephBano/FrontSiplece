import { Component } from "@angular/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent
{

  mostrarEtiquetas: boolean = true;
  buttonContenido: string = 'Ocultar';


  constructor() { }

  toggleVisibilidadEtiquetas() {
    this.mostrarEtiquetas = !this.mostrarEtiquetas;
    if (this.mostrarEtiquetas === false) this.buttonContenido = 'Mostrar';
    else this.buttonContenido = 'Ocultar';
  }
}
