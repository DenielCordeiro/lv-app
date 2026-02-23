import { Component } from '@angular/core';

import { MatTab, MatTabGroup } from '@angular/material/tabs';

import { About } from '../interfaces/about.interface';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass'],
})
export class AboutComponent {
  public about!: About;

  constructor() {
  }



}
