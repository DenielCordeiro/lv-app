import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { News } from 'src/app/interfaces/news.interface';
import { AddOrEditImageComponent } from '../add-or-edit-image/add-or-edit-image.component';
import { DeleteImageComponent } from '../delete-image/delete-image.component';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.sass']
})
export class CollectionsComponent implements OnInit {
  @Input() imagesCollections: News[] = [];
  news: News = {
    type: "Collection",
  };

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      try {
        console.log("imagens da coleção: ", this.imagesCollections);

      } catch (error) {
        console.log("Não foi possível salvar dados da imagem em variáveis, ", error);
        console.log("Dados da imagem carregada: ", this.imagesCollections);
      }
    }, 3000);
  }

  addOrUpdateImage(imageId: number | undefined):void {
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

      for (let index: number = 0; index < this.imagesCollections.length; index++) {
        if(this.imagesCollections[index]._id == imageId) {
          image = this.imagesCollections[index];
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

    for (let index: number = 0; index < this.imagesCollections.length; index++) {
      if(this.imagesCollections[index]._id == imageId) {
        image = this.imagesCollections[index];
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
