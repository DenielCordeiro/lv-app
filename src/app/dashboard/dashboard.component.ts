import { Component } from '@angular/core';
import { VerticalChartComponent } from './charts/vertical-chart/vertical-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [VerticalChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent {
  sales: number = 20;
  product: string = "colar";
  highestSellingProduct: number = 14;
}
