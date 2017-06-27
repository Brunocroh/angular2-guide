import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';

import { Hero } from "./hero";
@Injectable()
export class HeroService {
    private heroesUrl = 'http://localhost:1337/hero';

    constructor(private http: Http){}

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => {
                return response.json() as Array<Hero>
            })
            .catch(this.handleError);        
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    private handleError(error: any): Promise<any> {
        console.error("an error ocurred", error);
        return Promise.reject(error.message ||  error);
    }

}