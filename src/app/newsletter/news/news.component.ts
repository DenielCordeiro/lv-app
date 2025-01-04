import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { News } from 'src/app/interfaces/news.interface';
import { AddOrEditImageComponent } from '../add-or-edit-image/add-or-edit-image.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit {
  @Input() dataNews!: News;
  news: News = {
    type: "News",
  };
  loading: boolean = true;
  imageUrl!: string | undefined;

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
      try {
        this.imageUrl = this.dataNews.file?.url;
      } catch (error) {
        console.log("Não foi possível encontrar nenhuma imagem, ", error);
      }
    }, 5000);
  }

  addOrUpdateImage():void {
    if(this.dataNews !== undefined) {
      let dialogCreated = this.dialog.open<AddOrEditImageComponent>(AddOrEditImageComponent, {
        width: '70%',
        data: this.dataNews
      })

      dialogCreated.afterClosed().subscribe(image => {
        console.log("imagem: ", image);
      })

    } else {
      let dialogUpdated = this.dialog.open<AddOrEditImageComponent>(AddOrEditImageComponent, {
        width: '70%',
        data: this.news,
      });

      dialogUpdated.afterClosed().subscribe(image => {
        console.log("imagem: ", image);
      })
    }
  }

  deleteImage() {
    console.log('função excluir imagem!');

  }
}
