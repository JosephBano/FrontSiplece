import { Component, Input } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
@Component({
  selector: 'app-crud-button',
  templateUrl: './crudbutton.component.html',
  styleUrls: ['./crudbutton.component.css']
})
export class CRUDButtonComponent {

  @Input() sourceComponent!: string;

  buttonPressed() {
    console.log(`Button was accessed from ${this.sourceComponent}`);
  }
  
}
