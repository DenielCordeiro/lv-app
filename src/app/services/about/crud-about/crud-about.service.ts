import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { About } from "src/app/interfaces/about.interface";
import { environment } from "src/environments/environment";

export abstract class CrudAboutService {
    http!: HttpClient;
    route!: string;

    constructor(
        http: HttpClient,
        route: string
    ) {
        this.http = http;
        this.route = environment.api + route;
    }

    public getAbout(): Promise<About> {
        return lastValueFrom(this.http.get<About>(this.route))
            .then(data => {
                return this.handleResponse(data) as unknown as About;
            });
    }

    public updateAbout(id: number): Promise<About> {
        return lastValueFrom(this.http.put<About>(this.route, id))
            .then(data => {
                return this.handleResponse(data) as unknown as About;
            });
    }

    public handleResponse(response: About) {
        if(response) {
            return response;
        } else {
            throw new Error("Api 200, mas success falso!");
        }
    }
}