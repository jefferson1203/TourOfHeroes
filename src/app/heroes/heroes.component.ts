import {Component, OnInit} from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
  imports: [NgFor, RouterModule],
})
export class HeroesComponent implements OnInit{
  heroes: Hero[] = [];


  constructor(private heroService: HeroService){}

  ngOnInit(): void {
    this.getHeroes();
  }


  getHeroes(): void {
    this.heroService.getHeroes().subscribe( heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if(!name){
      return ;
    }
    this.heroService.addHero({name} as Hero).subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }


}