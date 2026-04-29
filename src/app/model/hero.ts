import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from './hero.model';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  // private heroesSignal = signal<Hero[]>([
  //   {
  //     "id": 1,
  //     "nome": "Superman",
  //     "potere": "Super forza e volo",
  //     "completata": false
  //   },
  //   {
  //     "id": 2,
  //     "nome": "Spider-Man",
  //     "potere": "Ragnatele e agilità",
  //     "completata": false
  //   },
  //   {
  //     "id": 3,
  //     "nome": "Batman",
  //     "potere": "Intelligenza e gadgets",
  //     "completata": false
  //   },
  //   {
  //     "id": 4,
  //     "nome": "Wonder Woman",
  //     "potere": "Lasso della verità",
  //     "completata": false
  //   },
  //   {
  //     "id": 5,
  //     "nome": "Flash",
  //     "potere": "Super velocità",
  //     "completata": false
  //   }
  // ]);

  // heroes = this.heroesSignal.asReadonly();

  // getHeroById(id: number): Hero | undefined {
  //   return this.heroesSignal().find(h => h.id === id);
  // }

  // updateHero(hero: Hero): void {
  //   const heroEsistente = this.heroesSignal().findIndex(h => h.id === hero.id);
    
  //   if (heroEsistente !== -1) {
  //     const updated = [...this.heroesSignal()];
  //     updated[heroEsistente] = hero;
  //     this.heroesSignal.set(updated);
  //   }
  // }

  // addHero(hero: Hero): void {
  //   const heroes = this.heroesSignal();
  //   if (!hero.id || hero.id === -1) {
  //     hero.id = Math.max(...heroes.map(h => h.id), 0) + 1;
  //   }
  //   this.heroesSignal.set([...heroes, hero]);
  // }

  // toggleHeroCompletion(hero: Hero): void {
  //   hero.completata = !hero.completata;
  //   this.updateHero(hero);
  // }






  //servizio con http
  private apiUrl = 'https://crudcrud.com/api/3c1a91c6a2a845219648b218712ef5a5/hero';

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`);
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.apiUrl, hero);
  }
  
  updateHero(id: string, hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiUrl}/${id}`, hero);
  }

  deleteHero(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  


}
