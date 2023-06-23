import { Component, OnInit, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { Instituciones } from '../../../../models/instituciones.model';
import { InstitucionesService } from 'src/app/services/modeloServicios/instituciones.service';
import { filter } from 'rxjs';
import {
  SortableInstitucionDirective,
  SortEvent,
  compare,
} from 'src/app/directive/sortable-institucion.directive';

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent implements OnInit {

  Instituciones: Instituciones[] = [];
  Data: Instituciones[] = [];
  filter!: string;

  @ViewChildren(SortableInstitucionDirective)
  headers!: QueryList<SortableInstitucionDirective>;

  constructor (
    private insititucionService: InstitucionesService,
  ) { }

  ngOnInit(): void {
    this.insititucionService.getInstituciones().subscribe( data => {
      this.Instituciones = data;
      this.Data = data
    })  
  }

  onSort({ column, direction }:SortEvent) {
    this.headers.forEach( header => {
      if(header.sortable !== column) {
        header.direction = '';
      } 
    });
    if (direction === '' || column === '') {
      this.Instituciones = this.Data;
    } else {
      this.Instituciones = [...this.Data].sort((a, b) => {
        const aValue = a[column] ?? '';
        const bValue = b[column] ?? '';
        const res = compare(aValue, bValue);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  editarIconSpan(institucion: Instituciones) {
  }
  elminarIconSpan(institucion: Instituciones){
  }
}
