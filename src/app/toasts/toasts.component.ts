import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ToastsService } from '../services/toasts/toasts.service';
import { ToastMessage } from '../interfaces/toast.interface';

@Component({
  selector: 'app-toasts',
  standalone: false,
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.sass'
})
export class ToastsComponent implements AfterViewInit {
  @ViewChild('toastViewChild') toastViewChild!: ElementRef;
  toastType: 'success' | 'error' | 'warning' | 'info' = 'info';
  toastMessage: string = '';

  constructor(private toastsService: ToastsService) {}

  ngAfterViewInit(): void {
    this.toastsService.toasts.subscribe((toast: ToastMessage) => {
      this.toastType = toast.type;
      this.toastMessage = toast.message;
      this.showToast();
    });
  }

  private showToast(): void {
    console.log('chegou aqui');

    const toast = new bootstrap.Toast(this.toastViewChild.nativeElement, {
      delay: 4000,
      autohide: true,
    });

    toast.show();
  }
}
