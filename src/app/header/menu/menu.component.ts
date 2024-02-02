import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent {
  isSelected: boolean = false;
  isOpen: boolean = false;

  changeIconBurguer(): void {
    if (this.isSelected == false) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
  }

  changeMenuProducts(): void {
    if (this.isOpen == false) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }
}
