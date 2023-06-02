import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private objStore: any[] = [];
  private objSubject: BehaviorSubject<any[]> = new BehaviorSubject(this.objStore);
  
  private identificador: string = '';
  private identificadorSubject: BehaviorSubject<string> = new BehaviorSubject(this.identificador);

  setIdentificator(data: string) {
    this.identificador = data;
    this.identificadorSubject.next(this.identificador);
  }

  addObj(data: any) {
    this.objStore.push(data);
    this.objSubject.next(this.objStore)
  }

  getObj() {
    return this.objSubject.asObservable();
  }

  getIdentificator() {
    return this.identificadorSubject.asObservable();
  }

}
