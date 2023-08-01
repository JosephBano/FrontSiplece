import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})
export class ContenedorComponent {
  @Input() url: any;
  @Input() titulo: any;
  @Input() icono: any;

}
