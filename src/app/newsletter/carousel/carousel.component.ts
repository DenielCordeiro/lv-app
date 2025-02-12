import { Component, Input, OnInit } from '@angular/core';
import { News } from 'src/app/interfaces/news.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { AddOrEditImageComponent } from '../add-or-edit-image/add-or-edit-image.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteImageComponent } from '../delete-image/delete-image.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {
  @Input() imagesCarousel: Product[] = [];
  news: News = {
    type: "Carousel",
  };
  currentItem: number = 0;

  constructor( public dialog: MatDialog) {}

  ngOnInit(): void {
    setTimeout(() => {
      try {
        console.log("imagens do Carrosel: ", this.imagesCarousel);

      } catch (error) {
        console.log("Não foi possível salvar dados da imagem em variáveis, ", error);
        console.log("Dados da imagem carregada: ", this.imagesCarousel);
      }
    }, 3000);

  }

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

  addOrUpdateImage(imageId: number | null):void {
    if (imageId == undefined) {
      try {
        this.dialog.open<AddOrEditImageComponent>(AddOrEditImageComponent, {
          width: '70%',
          data: this.news,
        });
      } catch(error) {
        console.log("[ERRO!], não foi possível abrir dialog de criar imagem, erro:", error);
      }
    } else {
      let image!: News;

      for (let index: number = 0; index < this.imagesCarousel.length; index++) {
        if(this.imagesCarousel[index]._id == imageId) {
          image = this.imagesCarousel[index];
        }
      }

      try {
        this.dialog.open<AddOrEditImageComponent>(AddOrEditImageComponent, {
          width: '70%',
          data: image
        });
      } catch(error) {
        console.log("[ERRO!], não foi possível abrir dialog de atualizar imagem, erro:", error);
      }
    }
  }

  deleteImage(imageId: number) {
    let image!: News;

    for (let index: number = 0; index < this.imagesCarousel.length; index++) {
      if(this.imagesCarousel[index]._id == imageId) {
        image = this.imagesCarousel[index];
      }
    }

    try {
      this.dialog.open<DeleteImageComponent>(DeleteImageComponent, {
        width: '70%',
        data: image,
      });
    } catch (error) {
      console.log("[ERRO!], não foi possível abrir dialog de excluir imagem, erro:", error);
    }
  }
}
