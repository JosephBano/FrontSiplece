import { Pipe, PipeTransform } from '@angular/core';
import { Institucion } from 'src/app/models/institucion.model';

@Pipe({
  name: 'institucion'
})
export class InstitucionPipe implements PipeTransform {

  transform(value: Institucion[], filter: string): Institucion[] {
    if(!filter || filter.length === 0) return value;
    if(value.length === 0) return value;

    return value.filter((value: Institucion) => {
      const DetalleFound = 
        value.Detalle?.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const SiglasFound =
        value.Siglas?.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      
      if(DetalleFound || SiglasFound) return value;
      return '';
    });
  }

}
