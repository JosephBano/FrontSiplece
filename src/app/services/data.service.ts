import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private objeto: any;

  constructor() { }

  setObjetp(obj: any) {
    this.objeto = obj;
  }

  getObjeto() {
    return this.objeto;
  }
}
