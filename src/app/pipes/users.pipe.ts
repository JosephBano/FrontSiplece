import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Pipe({
  name: 'user'
})
export class UsersPipe implements PipeTransform {

  transform(value: Usuario[], filter: string): Usuario[] {
    if(!filter || filter.length === 0) return value;
    
    if(value.length === 0) return value;

    return value.filter((usuario: Usuario) => {
      const nombreCompleto = (usuario.nombre + ' ' + usuario.apellido).toLowerCase();
      return nombreCompleto.includes(filter.toLowerCase());
    });
  }

}
