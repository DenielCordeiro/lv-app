import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
  standalone: false,
})
export class MenuComponent {
  isSelected: boolean = false;

  changeIconBurguer(): void {
    if (this.isSelected == false) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
  }
}
