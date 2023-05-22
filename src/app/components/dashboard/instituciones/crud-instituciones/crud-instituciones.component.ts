import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Instituciones } from 'src/app/models/instituciones.model';
import { InstitucionesService } from 'src/app/services/instituciones.service';

@Component({
  selector: 'app-crud-instituciones',
  templateUrl: './crud-instituciones.component.html',
  styleUrls: ['./crud-instituciones.component.css']
})
export class CrudInstitucionesComponent implements OnInit{

  @ViewChild('myDiv1') myDiv1!: ElementRef;
  @ViewChild('myDiv2') myDiv2!: ElementRef;
  @ViewChild('myDiv3') myDiv3!: ElementRef;
  selectedButton: number = 2;

  selectedInstitucion!: string;
  instituciones!: Instituciones[];

  constructor (private institucionesService: InstitucionesService) { }
  ngOnInit(): void {
    this.obtenerInstituciones();
  }

  toggleDiv(buttonNumber: number): void {
    this.selectedButton = buttonNumber;
    this.updateButtonStyles();
    this.updateDivVisibility();
  }

  updateButtonStyles(): void {
    const buttons = document.getElementsByClassName('btn');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('btn-selected');
    }

    const selectedButton = document.getElementById(`btn-${this.selectedButton}`);
    if (selectedButton) {
      selectedButton.classList.add('btn-selected');
    }
  }

  updateDivVisibility(): void {
    this.myDiv1.nativeElement.hidden = this.selectedButton !== 1;
    this.myDiv2.nativeElement.hidden = this.selectedButton !== 2;
    this.myDiv3.nativeElement.hidden = this.selectedButton !== 3;
  }

  obtenerInstituciones(): void {
    this.institucionesService.getInstituciones().subscribe(
      instituciones => {
        this.instituciones = instituciones;
      },
      error => {
        console.error('Error al obtener las instituciones:', error);
      }
    );
  }
}

