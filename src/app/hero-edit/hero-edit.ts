import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeroService } from '../model/hero';
import { Hero } from '../model/hero.model';

@Component({
  selector: 'app-hero-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: './hero-edit.html',
  styleUrl: './hero-edit.css',
})
export class HeroEdit implements OnInit {
  hero: Hero = {
    nome: '',
    potere: '',
    completata: false
  };

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get('_id');
    if (_id && _id !== 'new') {
      this.heroService.getHeroById(_id).subscribe({
        next: (foundHero) => {
          console.log('Hero trovato:', foundHero);
          if (foundHero) {
            this.hero = { ...foundHero };
          }
        },
        error: (error) => {
          console.error('Errore nel caricamento del hero:', error);
        }
      });
    }
  }

  salvaHero() {
    if (!this.hero.nome || !this.hero.potere) {
      alert("Compila tutti i campi");
      return;
    }

    if (!this.hero._id) {
      this.heroService.createHero(this.hero).subscribe({
        next: (response) => {
          this.router.navigate(['']);
        },
        error: (error) => {
          alert("Errore nel salvataggio dell'eroe");
          console.error(error);
        }
      });
    } else {
      this.heroService.updateHero(this.hero._id, this.hero).subscribe({
        next: (response) => {
          this.router.navigate(['']);
        },
        error: (error) => {
          alert("Errore nell'aggiornamento dell'eroe");
          console.error(error);
        }
      });
    }
  }

  reset() {
    if (this.hero._id) {
      this.hero = {
        _id: this.hero._id,
        nome: "",
        potere: "",
        completata: false
      }
    }
    else {
      this.hero = {
        nome: "",
        potere: "",
        completata: false
      }
    }

  }

  goBack() {
    this.router.navigate(['']);
  }
}
