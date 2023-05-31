import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'

@Component({
  selector: 'app-crudcontenidos',
  templateUrl: './crudcontenidos.component.html',
  styleUrls: ['./crudcontenidos.component.css']
})
export class CRUDContenidosComponent {

  constructor(public dialog: MatDialog) {}

}
