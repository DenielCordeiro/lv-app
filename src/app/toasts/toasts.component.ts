import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import * as bootstrap from 'bootstrap';
import { ToastsService } from '../services/toasts/toasts.service';
import { ToastMessage } from '../interfaces/toast.interface';
import { ToastType } from '../enums/toast-type.enum';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.sass'
})
export class ToastsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('toastElement') toastElement!: ElementRef;

  private bootstrapToast!: bootstrap.Toast;
  private toastSub!: Subscription;
  public ToastType = ToastType;
  public toastType!: ToastType;
  public toastMessage: string = '';

  constructor(private toastsService: ToastsService) {}

  ngAfterViewInit(): void {
    this.initToast();

    this.toastSub = this.toastsService.toasts.subscribe((toast: ToastMessage) => {
      this.toastType = toast.type;
      this.toastMessage = toast.message;
      this.showToast();
    });
  }

  private initToast(): void {
    this.bootstrapToast = new bootstrap.Toast(this.toastElement.nativeElement, {
      delay: 4000,
      autohide: true,
    });
  }

  private showToast(): void {
    this.bootstrapToast.show();
  }

  public closeToast(): void {
    this.bootstrapToast.hide();
  }

  ngOnDestroy(): void {
    this.toastSub?.unsubscribe();
  }
}
