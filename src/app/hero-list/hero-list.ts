import { Component, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroCard } from '../hero-card/hero-card';
import { Router } from '@angular/router';
import { HeroService } from '../model/hero';
import { Hero } from '../model/hero.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-list',
  imports: [CommonModule, HeroCard],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.css',
})
export class HeroList {

  heroes!: Signal<Hero[]>;


  constructor(private router: Router, protected heroService: HeroService) {
    this.heroes = toSignal(this.heroService.getHeroes(), {initialValue: []});
  }

  mark(hero: Hero) : void {
    hero.completata = !hero.completata;
  }
  
  get totalCompleted(): number{
    return this.heroes().filter(h => h.completata).length;
  }
  
  addHero(): void {
    this.router.navigate(['/edit', 'new']);
  }

  editHero(hero: Hero) {
    this.router.navigate(['/edit', hero._id]);
  }
}
