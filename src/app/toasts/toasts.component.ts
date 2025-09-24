import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap'; // Import Bootstrap JavaScript

@Component({
  selector: 'app-toasts.components',
  standalone: false,
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.sass'
})
export class ToastsComponent {

  constructor() {
    const toastElList = document.querySelectorAll('.toast')
    const toastList = Array.from(toastElList).map(toastEl => new bootstrap.Toast(toastEl, {}))
  }

}
