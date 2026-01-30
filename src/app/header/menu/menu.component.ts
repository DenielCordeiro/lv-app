import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DesktopMenuComponent } from './desktop-menu/desktop-menu.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    DesktopMenuComponent
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
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
