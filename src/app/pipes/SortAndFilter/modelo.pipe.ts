import { Pipe, PipeTransform } from '@angular/core';
import { Modelo } from 'src/app/models/modelos-generales/modelo.model';

@Pipe({
  name: 'modelo'
})
export class ModeloPipe implements PipeTransform {

  transform(value: Modelo[], filter: string): Modelo[] {
    if(!filter || filter.length === 0) return value;
    if(value.length === 0) return value;

    return value.filter((value: Modelo) => {
      const DetalleFound = 
        value.Detalle?.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      
      if(DetalleFound) return value;
      return '';
    });
  }

}
