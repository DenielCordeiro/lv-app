import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { News } from 'src/app/interfaces/news.interface';
import { AddOrEditImageComponent } from '../add-or-edit-image/add-or-edit-image.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent {
  @Input() dataNews!: News;
  news: News = {
    type: "News",
  };

  constructor(public dialog: MatDialog) {}

  addOrUpdateImage(data: News | undefined): void {
    if(data !== undefined) {
      this.dialog.open<AddOrEditImageComponent>(AddOrEditImageComponent, {
        width: '70%',
        data: this.dataNews
      });
    } else {
      this.dialog.open<AddOrEditImageComponent>(AddOrEditImageComponent, {
        width: '70%',
        data: this.news,
      });
    }
  }
}
