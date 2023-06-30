import { Pipe, PipeTransform } from '@angular/core';
import { SubCriterio } from 'src/app/models/subCriterios.model';

@Pipe({
  name: 'subCriterio'
})
export class SubCriterioPipe implements PipeTransform {

  transform(value: SubCriterio[], filter: string): SubCriterio[] {
    if(!filter || filter.length === 0) return value;
    if(value.length === 0) return value;

    return value.filter((value: SubCriterio) => {
      const DetalleFound = 
        value.Detalle?.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      
      if(DetalleFound) return value;
      return '';
    });
  }
}
