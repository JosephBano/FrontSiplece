import { Pipe, PipeTransform } from '@angular/core';
import { Instituciones } from 'src/app/models/instituciones.model';

@Pipe({
  name: 'institucion'
})
export class InstitucionPipe implements PipeTransform {

  transform(value: Instituciones[], filter: string): Instituciones[] {
    if(!filter || filter.length === 0) return value;
    if(value.length === 0) return value;

    return value.filter((value: Instituciones) => {
      const DetalleFound = 
        value.Detalle?.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const SiglasFound =
        value.Siglas?.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      
      if(DetalleFound || SiglasFound) return value;
      return '';
    });
  }

}
