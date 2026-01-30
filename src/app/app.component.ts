import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { ToastsComponent } from './toasts/toasts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    ToastsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  
})
export class AppComponent {
  title = 'Luz Violeta Macrãme';

  constructor() {}


}
