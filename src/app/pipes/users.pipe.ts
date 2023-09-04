import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Pipe({
  name: 'users'
})
export class UsersPipe implements PipeTransform {

  transform(value: Usuario[], filter: string): Usuario[] {
    if(!filter || filter.length === 0) return value;
    if(value.length === 0) return value;

    return value.filter((value: Usuario) => {
      const Apellido = value.apellido?.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1;

      if(Apellido) return value;
      return '';
    })
  }

}
