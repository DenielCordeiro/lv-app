import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.sass']
})
export class BuyComponent {

  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  openModal(purchaseModal: any): void {
    this.modalService.open(purchaseModal);
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
}
