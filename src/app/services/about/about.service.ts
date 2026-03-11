import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CrudAboutService } from "./crud-about/crud-about.service";
import { About } from "src/app/interfaces/about.interface";

@Injectable({
    providedIn: 'root'
})
export class AboutService extends CrudAboutService {
    constructor(
        public httpClient: HttpClient,
    ) {
        super(httpClient, '/about');
    }
}