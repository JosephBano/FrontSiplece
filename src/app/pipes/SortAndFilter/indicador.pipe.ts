import { Pipe, PipeTransform } from '@angular/core';
import { Indicador } from 'src/app/models/indicador.model';

@Pipe({
  name: 'indicador'
})
export class IndicadorPipe implements PipeTransform {

  transform(value: Indicador[], filter: string): Indicador[] {
    if(!filter || filter.length === 0) return value;
    if(value.length === 0) return value;

    return value.filter((value: Indicador) => {
      const DetalleFound = 
        value.Detalle?.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      
      if(DetalleFound) return value;
      return '';
    });
  }
}
