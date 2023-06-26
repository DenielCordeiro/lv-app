import { Injectable } from '@angular/core';

interface VerticalChart {
  name: string,
  value: number,
}

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  private data: VerticalChart[] = [
    {
      "name": "Janeiro",
      "value": 50
    },
    {
      "name": "Fevereiro",
      "value": 80
    },
  ];

  get registeredCustomers(): Object[] {
    return this.data;
  }
}
