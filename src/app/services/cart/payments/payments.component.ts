import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { Product } from 'src/app/interfaces/product.interface';
import { Sale } from 'src/app/interfaces/sale.interface';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.sass'],
  standalone: false,
})
export class PaymentsComponent implements OnInit {
  public paymentData!: Sale;
  public paymentMethods: string[] = ['BOLETO', 'CREDITO', 'PIX'];
  public selectedPaymentMethod: string | null = null;
  public toggleContent: boolean = false;
  public bankSlip: boolean = false;
  public creditCard: boolean = false;
  public pix: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    public dialog: MatDialog,
    private paymentsService: PaymentsService,
  ) {};

  ngOnInit(): void {}

  togglePaymentOption(paymentOptionName: string): void {
    switch (paymentOptionName) {
      case 'BOLETO':
        this.creditCard = false;
        this.pix = false;
        this.bankSlip = !this.bankSlip;
        this.selectedPaymentMethod = this.bankSlip ? 'BOLETO' : null;
        break;

      case 'CREDITO':
        this.pix = false;
        this.bankSlip = false;
        this.creditCard = !this.creditCard;
        this.selectedPaymentMethod = this.creditCard ? 'CREDITO' : null;
        break;

      case 'PIX':
        this.bankSlip = false;
        this.creditCard = false;
        this.pix = !this.pix;
        this.selectedPaymentMethod = this.pix ? 'PIX' : null;
        break;

      default:
        throw new Error('Método de pagamento desconhecido: ' + paymentOptionName);
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

      console.log();

      // this.paymentsService.createPaymentPIX(this.product)
      //   .then((qrCode) => {

      //     console.log('QR Code:', qrCode);
      //     this.dialog.closeAll();
      //   })
      //   .catch((error) => {
      //     console.error('Erro ao processar pagamento PIX:', error);
      //   });
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
