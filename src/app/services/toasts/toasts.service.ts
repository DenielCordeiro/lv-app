import { Injectable } from "@angular/core";
import { ReplaySubject } from 'rxjs';
import { ToastMessage } from '../../interfaces/toast.interface' 
import { ToastType } from "src/app/enums/toast-type.enum";

@Injectable({
    providedIn: 'root'
})
export class ToastsService {
  // Cria um "canal de comunicação" interno
  // Neste caso um emissor de eventos que vai disparar objetos do tipo ToastMessage
  // Subject é um tipo especial de Observable que permite:
  // 1) emitir valores manualmente (.next())
  // 2) ser escutado por outros lugares (.subscribe())
  private toastSubject = new ReplaySubject<ToastMessage>();
  
  // Expõe apenas a parte "observável" do Subject
  // Quem usa o service pode ESCUTAR os eventos
  // mas NÃO pode emitir novos eventos (.next())
  toasts = this.toastSubject.asObservable();

  show(type: ToastType, message: string): void {
    this.toastSubject.next({ type, message });
  }
}