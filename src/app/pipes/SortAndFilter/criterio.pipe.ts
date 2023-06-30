import { Pipe, PipeTransform } from '@angular/core';
import { Criterio } from 'src/app/models/criterios.model';

@Pipe({
  name: 'criterio'
})
export class CriterioPipe implements PipeTransform {

  transform(value: Criterio[], filter: string): Criterio[] {
    if(!filter || filter.length === 0) return value;
    if(value.length === 0) return value;

    return value.filter((value: Criterio) => {
      const DetalleFound = 
        value.Detalle?.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      
      if(DetalleFound) return value;
      return '';
    });
  }

}
