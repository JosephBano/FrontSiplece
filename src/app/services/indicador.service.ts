import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Indicador } from '../models/indicador.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  constructor(private http: HttpClient) { }

  private indicadores: Indicador[] = [
    { id: '1', descripcion: 'Indicador 1', subCriterioId: '1' },
    { id: '2', descripcion: 'Indicador 2', subCriterioId: '1' },
    { id: '3', descripcion: 'Indicador 3', subCriterioId: '1' },
    { id: '4', descripcion: 'Indicador 4', subCriterioId: '1' },
    { id: '5', descripcion: 'Indicador 5', subCriterioId: '2' },
    { id: '6', descripcion: 'Indicador 6', subCriterioId: '2' },
    { id: '7', descripcion: 'Indicador 7', subCriterioId: '3' },
    { id: '8', descripcion: 'Indicador 8', subCriterioId: '4' },
    { id: '9', descripcion: 'Indicador 9', subCriterioId: '5' },
    { id: '10', descripcion: 'Indicador 10', subCriterioId: '6' },
    { id: '11', descripcion: 'Indicador 11', subCriterioId: '7' },
    { id: '12', descripcion: 'Indicador 12', subCriterioId: '8' },
    { id: '13', descripcion: 'Indicador 13', subCriterioId: '9' },
    { id: '14', descripcion: 'Indicador 14', subCriterioId: '10' },
    { id: '15', descripcion: 'Indicador 15', subCriterioId: '11' },
    { id: '16', descripcion: 'Indicador 16', subCriterioId: '12' },
    { id: '17', descripcion: 'Indicador 17', subCriterioId: '13' },
    { id: '18', descripcion: 'Indicador 18', subCriterioId: '14' },
    { id: '19', descripcion: 'Indicador 19', subCriterioId: '15' },
    { id: '20', descripcion: 'Indicador 20', subCriterioId: '16' },
  ];
  
  getIndicadores(id: string): Observable<Indicador[]> {
    const indicadores = this.indicadores.filter(e => e.subCriterioId === id);
    return of(indicadores);
  }
}
