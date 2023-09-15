import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-boton-atras',
  templateUrl: './boton-atras.component.html',
  styleUrls: ['./boton-atras.component.css']
})
export class BotonAtrasComponent {

  constructor( private _location: Location) { }

  goBackRoute() {
    this._location.back()
  }

}
