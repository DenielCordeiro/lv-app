import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseModel } from 'src/app/models/base-model';

interface MelhorEnvio<T extends BaseModel> {
  success: boolean,
  data: T | T[] | boolean | File
}

@Injectable({
  providedIn: 'root'
})
export class MelhorEnvioService<T extends BaseModel> {
  private readonly melhorEnvioAPI = environment.api + '/melhor-envio';

  constructor(public http: HttpClient) {}

  public getShipping(postalCode: string): Promise<T>{
    return lastValueFrom(this.http.post<MelhorEnvio<T>>(`${this.melhorEnvioAPI + '/:' + postalCode}`, null))
      .then(result => {
        return this.handleResponse(result) as any;
      });
  }

  public handleResponse(response: MelhorEnvio<T>) {
    if(response) {
      return response.data;
    } else {
      throw new Error("Api 200, mas success falso!");
    }
  }
}
