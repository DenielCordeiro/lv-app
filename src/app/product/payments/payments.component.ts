import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.sass'],
  standalone: false,
})
export class PaymentsComponent implements OnInit {
  selectedPaymentMethod: string | null = null;
  toggleContent: boolean = false;
  bankSlip: boolean = false;
  creditCard: boolean = false;
  pix: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    public dialog: MatDialog,
    private paymentsService: PaymentsService,
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
  }

  proceedToPayment() {
    if (this.selectedPaymentMethod) {
      this.toggleContent = true;
    } else {
      throw new Error('Nenhum método de pagamento selecionado.');
    }
  }

  Payment(): void {
    if (this.selectedPaymentMethod === 'PIX') {
      this.paymentsService.createPaymentPIX(this.product)
        .then(() => {
          this.dialog.closeAll();
        })
        .catch((error) => {
          console.error('Erro ao processar pagamento PIX:', error);
        });

    } else if (this.selectedPaymentMethod === 'BOLETO') {
      this.paymentsService.createPaymentBankSlip(this.product)
        .then(() => {
          this.dialog.closeAll();
        })
        .catch((error) => {
          console.error('Erro ao processar pagamento PIX:', error);
        });

    } else if (this.selectedPaymentMethod === 'CREDITO') {
      this.paymentsService.createPaymentCreditCard(this.product)
        .then(() => {
          this.dialog.closeAll();
        })
        .catch((error) => {
          console.error('Erro ao processar pagamento PIX:', error);
        });

    }
  }
}
