import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';

import { Hero } from "./hero";
@Injectable()
export class HeroService {
    private heroesUrl = 'http://localhost:1337/hero';
    private headers = new Headers({'Content-Type':'application/json'});
    constructor(private http: Http){}

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json() as Array<Hero>)
            .catch(this.handleError);        
    }

    getHero(id: string): Promise<Hero> {
        return this.http.get(`${this.heroesUrl}/${id}`)
            .toPromise()
            .then(response => response.json() as Hero)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero>{
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero>{
        return this.http
            .post(this.heroesUrl, 
                JSON.stringify({name: name}), 
                {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Hero)
            .catch(this.handleError);
                
    }

    delete(id: string): Promise<void>{
        const url = `${this.heroesUrl}/${id}`
        return this.http
            .delete(url,{headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("an error ocurred", error);
        return Promise.reject(error.message ||  error);
    }

}