import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Hero } from "./hero";

@Injectable()
export class HeroSearchService {
    private heroesUrl = 'http://localhost:1337/hero';
    constructor(private http: Http) { }

    search(term: string): Observable<Hero[]>{
        const url = `${this.heroesUrl}?where?={"name":{"contains":"${term}"}}`

        return this.http
            .get(url)
            .map(response => response.json() as Hero[]);
    }
}