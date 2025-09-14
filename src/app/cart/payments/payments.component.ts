import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart/cart.service';

enum PaymentMethod {
  credit = "CREDIT",
  pix = "PIX",
  bankSlip = "BANKSLIP"
}

@Component({
  selector: 'app-payments',
  standalone: false,
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.sass'
})
export class PaymentsComponent implements OnInit {
  paymentMethods = PaymentMethod;

  constructor(
    @Inject(MAT_DIALOG_DATA) public cart: void[],
    public dialog: MatDialog,
    public dialogAddOrEdit: MatDialogRef<PaymentsComponent>,
    private cartService: CartService
  ) {}

  ngOnInit() {
    console.log("Dados do carrinho: ", this.cart);
  }

  processPayment(method: PaymentMethod): void {
    switch (method) {
      case PaymentMethod.credit:
        console.log("Processando pagamento via cartão de crédito...");
        break;
      case PaymentMethod.pix:
        console.log("Gerando QR Code para pagamento via Pix...");
        this.paymentPIX();

        break;
      case PaymentMethod.bankSlip:
        console.log("Gerando boleto bancário...");
        break;
      default:
        console.log("Método de pagamento não reconhecido.");
    }
  }


  paymentPIX(): void {
    const PIXData = {
      valor: 100.00,
      cpf: '12345678909',
      name: 'Francisco da Silva'
    };

    this.cartService.generatePix(PIXData)
      .then(response => {
        console.log("Resposta do servidor para pagamento via Pix: ", response);
      })
      .catch(error => {
        console.error("Erro ao processar pagamento via Pix: ", error);
      });
  }
}
