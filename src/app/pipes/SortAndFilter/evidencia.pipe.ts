import { Pipe, PipeTransform } from '@angular/core';
import { Evidencia } from 'src/app/models/evidencia.model';

@Pipe({
  name: 'evidencia'
})
export class EvidenciaPipe implements PipeTransform {

  transform(value: Evidencia[], filter: string): Evidencia[] {
    if(!filter || filter.length === 0) return value;
    if(value.length === 0) return value;

    return value.filter((value: Evidencia) => {
      const DetalleFound = 
        value.Detalle?.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      
      if(DetalleFound) return value;
      return '';
    });
  }

}
