import { Component } from '@angular/core';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})
export class TablasComponent {

  activeTab: string = 'Modelos';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
