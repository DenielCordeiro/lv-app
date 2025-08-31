import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public cart: void[],
    public dialog: MatDialog,
    public dialogAddOrEdit: MatDialogRef<PaymentsComponent>
  ) {}

  ngOnInit() {}

  processPayment(method: PaymentMethod) {
    switch (method) {
      case PaymentMethod.credit:
        console.log("Processando pagamento via cartão de crédito...");
        break;
      case PaymentMethod.pix:
        console.log("Gerando QR Code para pagamento via Pix...");
        break;
      case PaymentMethod.bankSlip:
        console.log("Gerando boleto bancário...");
        break;
      default:
        console.log("Método de pagamento não reconhecido.");
    }
  }
}
