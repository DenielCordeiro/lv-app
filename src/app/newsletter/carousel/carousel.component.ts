import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent {
  currentItem: number = 0;

  constructor() {}

  moveImage(movement: boolean) {
    const items = document.querySelectorAll('.item');
    const maxItems = items.length;

    if (movement == true) {
      this.currentItem += 1

      if (this.currentItem >= maxItems) {
        this.currentItem = 0
      }
    } else {
      this.currentItem -= 1

      if (this.currentItem < 0) {
        this.currentItem = maxItems - 1
      }
    }

    items.forEach(item => {
      item.classList.remove('current-item');
    });

    items[this.currentItem].scrollIntoView({
      inline: "center",
      behavior: "smooth",
      block: "nearest"
    });

    items[this.currentItem].classList.add('current-item');
  }
}
