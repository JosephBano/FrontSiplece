import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Indicador } from '../../models/indicador.model';
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
    { id: '5', descripcion: 'Indicador 5', subCriterioId: '1' },
    { id: '6', descripcion: 'Indicador 6', subCriterioId: '1' },
    { id: '7', descripcion: 'Indicador 7', subCriterioId: '1' },
    { id: '8', descripcion: 'Indicador 8', subCriterioId: '1' },
    { id: '9', descripcion: 'Indicador 9', subCriterioId: '1' },
    { id: '10', descripcion: 'Indicador 10', subCriterioId: '1' },
    { id: '11', descripcion: 'Indicador 11', subCriterioId: '1' },
    { id: '12', descripcion: 'Indicador 12', subCriterioId: '1' },
    { id: '13', descripcion: 'Indicador 13', subCriterioId: '1' },
    { id: '14', descripcion: 'Indicador 14', subCriterioId: '1' },
    { id: '15', descripcion: 'Indicador 15', subCriterioId: '1' },
    { id: '16', descripcion: 'Indicador 16', subCriterioId: '1' },
    { id: '17', descripcion: 'Indicador 17', subCriterioId: '1' },
    { id: '18', descripcion: 'Indicador 18', subCriterioId: '1' },
    { id: '19', descripcion: 'Indicador 19', subCriterioId: '1' },
    { id: '20', descripcion: 'Indicador 20', subCriterioId: '1' },
    { id: '21', descripcion: 'Indicador 21', subCriterioId: '1' },
    { id: '22', descripcion: 'Indicador 22', subCriterioId: '1' },
    { id: '23', descripcion: 'Indicador 23', subCriterioId: '1' },
    { id: '24', descripcion: 'Indicador 24', subCriterioId: '1' },
    { id: '25', descripcion: 'Indicador 25', subCriterioId: '1' },
    { id: '26', descripcion: 'Indicador 26', subCriterioId: '1' },
    { id: '27', descripcion: 'Indicador 27', subCriterioId: '1' },
    { id: '28', descripcion: 'Indicador 28', subCriterioId: '1' },
    { id: '29', descripcion: 'Indicador 29', subCriterioId: '1' },
    { id: '31', descripcion: 'Indicador 31', subCriterioId: '1' },
    { id: '32', descripcion: 'Indicador 32', subCriterioId: '1' },
    { id: '33', descripcion: 'Indicador 33', subCriterioId: '1' },
    { id: '34', descripcion: 'Indicador 34', subCriterioId: '1' },
    { id: '35', descripcion: 'Indicador 35', subCriterioId: '1' },
    { id: '36', descripcion: 'Indicador 36', subCriterioId: '1' },
    { id: '37', descripcion: 'Indicador 37', subCriterioId: '1' },
    { id: '38', descripcion: 'Indicador 38', subCriterioId: '1' },
    { id: '39', descripcion: 'Indicador 39', subCriterioId: '1' },
    { id: '30', descripcion: 'Indicador 30', subCriterioId: '1' },
    { id: '40', descripcion: 'Indicador 40', subCriterioId: '1' },
    { id: '41', descripcion: 'Indicador 41', subCriterioId: '1' },
    { id: '42', descripcion: 'Indicador 42', subCriterioId: '1' },
    { id: '43', descripcion: 'Indicador 43', subCriterioId: '1' },
    { id: '44', descripcion: 'Indicador 44', subCriterioId: '1' },
    { id: '45', descripcion: 'Indicador 45', subCriterioId: '1' },
    { id: '46', descripcion: 'Indicador 46', subCriterioId: '1' },
    { id: '47', descripcion: 'Indicador 47', subCriterioId: '1' },
    { id: '48', descripcion: 'Indicador 48', subCriterioId: '1' },
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
