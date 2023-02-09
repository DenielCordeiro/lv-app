import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './services/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'lv-app';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  // showProductHeaderMenu(): void { }

}
