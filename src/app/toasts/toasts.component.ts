import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';

enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}


@Component({
  selector: 'app-toasts',
  standalone: false,
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.sass'
})
export class ToastsComponent implements AfterViewInit{
  @ViewChild('successToast') successToast!: ElementRef;
  @ViewChild('errorToast') errorToast!: ElementRef;
  @ViewChild('warningToast') warningToast!: ElementRef;
  @ViewChild('infoToast') infoToast!: ElementRef;

  textFromToast: string = 'TESTE DE TOAST SUCESSO';

  ngAfterViewInit() {
    this.selectedToast('success');
  }

  selectedToast(toastType: string): void {
    switch (toastType) {
      case ToastType.SUCCESS:
        if (this.successToast) {
          const myToast = new bootstrap.Toast(this.successToast.nativeElement, {
            autohide: true,
            delay: 4000
          });

          myToast.show();
        }
        break;
      case ToastType.ERROR:
        if (this.errorToast) {
          const myToast = new bootstrap.Toast(this.errorToast.nativeElement, {
            autohide: true,
            delay: 4000
          });

          myToast.show();
        }
        break;
      case ToastType.WARNING:
        if (this.warningToast) {
          const myToast = new bootstrap.Toast(this.warningToast.nativeElement, {
            autohide: true,
            delay: 4000
          });

          myToast.show();
        }
        break;
      case ToastType.INFO:
        if (this.infoToast) {
          const myToast = new bootstrap.Toast(this.infoToast.nativeElement, {
            autohide: true,
            delay: 4000
          });

          myToast.show();
        }
        break;
      default:
        break;
    }
  }
}
