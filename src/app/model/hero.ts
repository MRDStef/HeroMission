import { Injectable, signal } from '@angular/core';
import { Hero } from '../hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesSignal = signal<Hero[]>([
    {
      "id": 1,
      "nome": "Superman",
      "potere": "Super forza e volo",
      "completata": false
    },
    {
      "id": 2,
      "nome": "Spider-Man",
      "potere": "Ragnatele e agilità",
      "completata": false
    },
    {
      "id": 3,
      "nome": "Batman",
      "potere": "Intelligenza e gadgets",
      "completata": false
    },
    {
      "id": 4,
      "nome": "Wonder Woman",
      "potere": "Lasso della verità",
      "completata": false
    },
    {
      "id": 5,
      "nome": "Flash",
      "potere": "Super velocità",
      "completata": false
    }
  ]);

  heroes = this.heroesSignal.asReadonly();

  getHeroById(id: number): Hero | undefined {
    return this.heroesSignal().find(h => h.id === id);
  }

  updateHero(hero: Hero): void {
    const heroEsistente = this.heroesSignal().findIndex(h => h.id === hero.id);
    
    if (heroEsistente !== -1) {
      const updated = [...this.heroesSignal()];
      updated[heroEsistente] = hero;
      this.heroesSignal.set(updated);
    }
  }

  addHero(hero: Hero): void {
    const heroes = this.heroesSignal();
    if (!hero.id || hero.id === -1) {
      hero.id = Math.max(...heroes.map(h => h.id), 0) + 1;
    }
    this.heroesSignal.set([...heroes, hero]);
  }

  toggleHeroCompletion(hero: Hero): void {
    hero.completata = !hero.completata;
    this.updateHero(hero);
  }
}
