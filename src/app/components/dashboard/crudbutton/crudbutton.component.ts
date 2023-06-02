import { Component, Input, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { CrearElementoComponent } from './crear-elemento/crear-elemento.component';
@Component({
  selector: 'app-crud-button',
  templateUrl: './crudbutton.component.html',
  styleUrls: ['./crudbutton.component.css']
})
export class CRUDButtonComponent {

  @Input() sourceComponent!: string;
  @ViewChild(CrearElementoComponent) resetElement!: CrearElementoComponent;
  
  constructor (private ds: DataService) {  }

  buttonPressed() {
    this.ds.setIdentificator(this.sourceComponent);  
  }

  setDefaultCrudElements() {
    this.ds.setIdentificator('');
    this.resetElement.buttonClicked();
  }
  
}
