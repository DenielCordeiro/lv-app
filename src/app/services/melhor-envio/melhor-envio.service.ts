import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MelhorEnvioService {
  constructor(public http: HttpClient) {}

  public buildHeader(): HttpHeaders {
    let token = JSON.stringify(environment.tokenMelhorEnvio);

    let headers = new HttpHeaders ({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + token,
      'User-Agent': 'Aplicação camila.luzvioleta@gmail.com'
    })

    return headers;
  }

  public getShipping(postalCode: string): Promise<[{}]>{
    const url = JSON.stringify(environment.apiMelhorEnvio);
    let header = this.buildHeader();

    return lastValueFrom(this.http.post<[{}]>(url, { headers: header }))
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
