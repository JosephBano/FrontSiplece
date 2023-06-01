import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-crud-button',
  templateUrl: './crudbutton.component.html',
  styleUrls: ['./crudbutton.component.css']
})
export class CRUDButtonComponent {

  @Input() sourceComponent!: string;
  
  constructor (private ds: DataService) {  }

  buttonPressed() {
    this.ds.setLocalStorageIdentificator(this.sourceComponent);
    console.log(`Button was accessed from ${this.sourceComponent}`);
  }
  
}
