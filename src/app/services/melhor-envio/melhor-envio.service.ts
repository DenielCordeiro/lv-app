import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MelhorEnvioService {
  private readonly melhorEnvioAPI = environment.api + '/melhor-envio';

  constructor(public http: HttpClient) {}

  public getShipping(postalCode: string): Promise<any>{
    return lastValueFrom(this.http.post<any>(`${this.melhorEnvioAPI + '/:' + postalCode}`, null))
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(error => {
        console.log(error);
        return error;
      })
  }
}
