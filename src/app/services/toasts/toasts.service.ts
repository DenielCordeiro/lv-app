import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { ToastMessage } from '../../interfaces/toast.interface' 
import { ToastType } from "src/app/enums/toast-type.enum";



@Injectable({
    providedIn: 'root'
})
export class ToastsService {
  private toastSubject = new Subject<ToastMessage>();
  toast$ = this.toastSubject.asObservable();

  show(type: ToastType, message: string): void {
    this.toastSubject.next({ type, message });
  }
}