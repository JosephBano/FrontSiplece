import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  setLocalStorage(data: any) {
    const dataString = JSON.stringify(data);
    localStorage.setItem('obj', dataString);
  }
}
