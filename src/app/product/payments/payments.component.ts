import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.sass'],
  standalone: false,
})
export class PaymentsComponent implements OnInit {
  selectedPaymentMethod: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    public dialog: MatDialog,
  ) {};

  ngOnInit(): void {}

  handlePaymentOptionChange(paymentOptionName: string): void {

  }

  Payment(): void {
    if (this.selectedPaymentMethod) {
      console.log(`Prosseguir para o pagamento com: ${this.selectedPaymentMethod}`);
    } else {
      console.warn('Nenhuma forma de pagamento selecionada.');
    }
  }
}
