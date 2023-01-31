import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.sass']
})
export class NewsletterComponent implements OnInit {
  id: number = 5;
  //numero para acessar o produto correto

  counter: number = 25;
  //counter = numero salvo no banco

  likes: number = 3;
  comment: string = "";

  ngOnInit(): void {
    this.readingComments();
  }

  onCounter(): void {
    this.counter ++;
  }

  readingComments(): void {
    var a = 0;
    var comments: string[] = ["test", "test2", "test3"];
    //comments  = comentários salvos no banco de dados

    for (; a < comments.length; a++) {
      this.comment = comments[a];
      console.log(this.comment);
    }
  }

  likedComment(): void {
    this.likes ++
  }
}
