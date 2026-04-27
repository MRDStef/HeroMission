import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroCard } from '../hero-card/hero-card';
import { Router } from '@angular/router';
import { HeroService } from '../model/hero';
import { Hero } from '../hero.model';

@Component({
  selector: 'app-hero-list',
  imports: [CommonModule, HeroCard],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.css',
})
export class HeroList {

  constructor(private router: Router, protected heroService: HeroService) {}

  mark(hero: Hero) : void {
    hero.completata = !hero.completata;
  }
  
  get totalCompleted(): number{
    return this.heroService.heroes().filter(h => h.completata).length;
  }

  editHero(hero: Hero) {
    this.router.navigate(['/edit', hero.id]);
  }

  addHero() {
    this.router.navigate(['/edit', -1]);
  }
}
