import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CRUDContenidosComponent } from './crudcontenidos/crudcontenidos.component';

@Component({
  selector: 'app-crud-button',
  templateUrl: './crudbutton.component.html',
  styleUrls: ['./crudbutton.component.css']
})
export class CRUDButtonComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(CRUDContenidosComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
