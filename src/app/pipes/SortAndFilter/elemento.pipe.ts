import { Pipe, PipeTransform } from '@angular/core';
import { ElementoFundamental } from 'src/app/models/elemento-fundamental.model';

@Pipe({
  name: 'elemento'
})
export class ElementoPipe implements PipeTransform {

  transform(value: ElementoFundamental[], filter: string): ElementoFundamental[] {
    if(!filter || filter.length === 0) return value;
    if(value.length === 0) return value;

    return value.filter((value: ElementoFundamental) => {
      const DetalleFound = 
        value.Detalle?.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      
      if(DetalleFound) return value;
      return '';
    });
  }

}
