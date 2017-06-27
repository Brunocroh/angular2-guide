import { Component,OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from "./hero.service";
import { Router } from "@angular/router";


@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})


export class HeroesComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private router: Router
  ){}

  ngOnInit() : void { this.getHeroes(); }
  
  selectedHero: Hero;
  heroes : Hero[];
  
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void{
    let retorno = this.heroService.getHeroes()
    retorno.then(heroes => this.heroes = heroes);
  }
  
  goToDetails(): void{
    this.router.navigate(['/detail',this.selectedHero.id]);
  }

}

