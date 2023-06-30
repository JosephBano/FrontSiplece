import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleBarService {
  private toggleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public toggle$: Observable<boolean> = this.toggleSubject.asObservable();

  constructor() { }

  public toggle(): void {
    const currentValue = this.toggleSubject.getValue();
    this.toggleSubject.next(!currentValue);
  }
}
