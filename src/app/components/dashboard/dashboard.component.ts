import { Component, OnInit } from "@angular/core";
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit
{
  mostrarEtiquetas: boolean = true;
  buttonContenido: string = 'Ocultar';

  constructor(private ds: DataService) { }

  ngOnInit(): void {
  }

  toggleVisibilidadEtiquetas() {
    this.mostrarEtiquetas = !this.mostrarEtiquetas;
    if (this.mostrarEtiquetas === false) this.buttonContenido = 'Mostrar';
    else this.buttonContenido = 'Ocultar';
  }
}
