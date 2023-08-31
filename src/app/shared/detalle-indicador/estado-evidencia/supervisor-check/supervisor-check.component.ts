import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-supervisor-check',
  templateUrl: './supervisor-check.component.html',
  styleUrls: ['./supervisor-check.component.css']
})
export class SupervisorCheckComponent {
  @Input() idElemento: any;
}
