import { Component } from '@angular/core';
import { ChartsService } from 'src/app/services/dashboard/charts.service';

@Component({
  selector: 'app-vertical-chart',
  templateUrl: './vertical-chart.component.html',
  styleUrls: ['./vertical-chart.component.sass']
})
export class VerticalChartComponent {
  view: [number, number] = [700, 400];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Meses';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Clientes';
  legendTitle: string = 'Meses';
  colorScheme: any = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  constructor(private chartsService: ChartsService) {}

  get single(): Object[] {
    return this.chartsService.registeredCustomers;
  }
}
