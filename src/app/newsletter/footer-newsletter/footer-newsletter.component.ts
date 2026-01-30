import { Component, OnInit } from '@angular/core';
import { NewsletterService } from 'src/app/services/newsletter/newsletter.service';
import { Review } from 'src/app/interfaces/review.interface';

@Component({
  selector: 'app-footer-newsletter',
  standalone: true,
  templateUrl: './footer-newsletter.component.html',
  styleUrls: ['./footer-newsletter.component.sass'],
})
export class FooterNewsletterComponent implements OnInit {
  avaliations: Review[] = [{
    userName: "Teste",
    review: "Eu amei a Luz Violeta Macrâme",
    date: Date.now(),
    stars: 3,
    filledStars: 2,
  }];

  reviews!: Review[];

  constructor(private newsletterService: NewsletterService) {};

  ngOnInit(): void {};

  searchForReviews(): void {
    this.newsletterService.getReviews()
      .then(data => {
        data.forEach(review => {
          this.reviews.push(review);
        });
      })
      .catch(error => {
        alert('ERRO: Não foi possível carregar as imagens');
        console.log(error);
      });
  };
}
