import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { News } from 'src/app/interfaces/news.interface';
import { AddOrEditImageComponent } from '../add-or-edit-image/add-or-edit-image.component';
import { DeleteImageComponent } from '../delete-image/delete-image.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass'],
  standalone: false,
})
export class NewsComponent implements OnInit {
  @Input() dataNews!: News;
  news: News = {
    type: "News",
  };
  loading: boolean = true;
  imageUrl: string | undefined = undefined;
  linkProduct: string | undefined = undefined;

  constructor(
    public dialog: MatDialog,
    public router: Router,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      try {
        this.imageUrl = this.dataNews.file?.url;
        this.linkProduct = this.dataNews.linkProduct;
        this.loading = false;
      } catch (error) {
        console.log("Não foi possível salvar dados da imagem em variáveis, ", error);
        console.log("Dados da imagem carregada: ", this.dataNews);
      }
    }, 3000);
  }

  addOrUpdateImage():void {
    try {
      if(this.dataNews !== undefined) {
        this.dialog.open<AddOrEditImageComponent>(AddOrEditImageComponent, {
          data: this.dataNews
        });
      } else {
        this.dialog.open<AddOrEditImageComponent>(AddOrEditImageComponent, {
          data: this.news,
        });
      }
    } catch (error) {
      console.log("[ERRO!], não foi possível abrir dialog de atualizar imagem, erro:", error);
    }
  }

  deleteImage() {
    try {
      this.dialog.open<DeleteImageComponent>(DeleteImageComponent, {
        data: this.dataNews,
      });
    } catch (error) {
      console.log("[ERRO!], não foi possível abrir dialog de excluir imagem, erro:", error);
    }
  }
}
