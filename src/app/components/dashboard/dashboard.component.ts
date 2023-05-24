import { Component } from "@angular/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent
{
  selectedInstitucion!: string;
  selectedModelo!: string;
  selectedCriterio!: string;

  constructor() { }
}
