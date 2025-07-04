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
  bankSlip: boolean = false;
  creditCard: boolean = false;
  pix: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    public dialog: MatDialog,
  ) {};

  ngOnInit(): void {}

  togglePaymentOption(paymentOptionName: string): void {
    if (paymentOptionName === 'BOLETO') {
      this.creditCard = false;
      this.pix = false;
      this.bankSlip = !this.bankSlip;
      this.selectedPaymentMethod = this.bankSlip ? 'BOLETO' : null;
    } else if (paymentOptionName === 'CREDITO') {
      this.pix = false;
      this.bankSlip = false;
      this.creditCard = !this.creditCard;
      this.selectedPaymentMethod = this.creditCard ? 'CREDITO' : null;
    } else if (paymentOptionName === 'PIX') {
      this.bankSlip = false;
      this.creditCard = false;
      this.pix = !this.pix;
      this.selectedPaymentMethod = this.pix ? 'PIX' : null;
    } else {
      throw new Error('Método de pagamento desconhecido:' + paymentOptionName);
    }

    console.log(`Método de pagamento selecionado: ${this.selectedPaymentMethod}`);
  }

  Payment(): void {
    if (this.selectedPaymentMethod) {
      console.log(`Prosseguir para o pagamento com: ${this.selectedPaymentMethod}`);
    } else {
      console.warn('Nenhuma forma de pagamento selecionada.');
    }
  }
}
