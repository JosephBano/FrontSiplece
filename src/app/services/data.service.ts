import { Injectable } from '@angular/core';
import { CriteriosService } from './modeloServicios/criterios.service';
import { SubCriteriosService } from './modeloServicios/sub-criterios.service';
import { IndicadorService } from './modeloServicios/indicador.service';
import { ElementoFundamentalService } from './modeloServicios/elemento-fundamental.service';
import { EvidenciaService } from './modeloServicios/evidencia.service';
import { Criterio } from '../models/modelos-generales/criterio.model';
import { toArray, filter } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private critService: CriteriosService,
    private subcService: SubCriteriosService,
    private indiService: IndicadorService,
    private elemService: ElementoFundamentalService,
    private evidService: EvidenciaService,
    private loginService: LoginService,
  ) { }

  /*public async getUniqueCode(idPadre: string , detalle: string, tipo: string){
    switch(tipo) {
      case 'criterio':
        const value = `crit-${idPadre}${this.formatoCadena(detalle)}`;
        const data = await this.critService.GetDetalleByModelo(idPadre);
        const cont = data.pipe(filter(x => x === detalle));
        if (cont.length > 0) {
          return `${value}${cont}`;
        }
        return value;
        break;
      case 'subcriterio':
        this.subcService.getByCriterio(idPadre).subscribe(
          (data) => {
          }
        )
    }
  }*/

  formatoCadena(cadena: string): string {
    const primeros = cadena.slice(0, 2);
    const ultimos = cadena.slice(-2);
    return primeros + ultimos;
  }

  nombrePerfil(): string {
    const perfil = this.loginService.getTokenDecoded().perfil;
    const nombre = perfil.split('-');
    return nombre[0];
  }
}
