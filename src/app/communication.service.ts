import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private agregarNuevaTareaSource = new Subject<void>();

  agregarNuevaTarea$ = this.agregarNuevaTareaSource.asObservable();

  notificarAgregarNuevaTarea() {
    this.agregarNuevaTareaSource.next();
  }
}
