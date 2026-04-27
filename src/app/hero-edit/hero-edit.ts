import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Hero } from '../hero.model';
import { HeroService } from '../model/hero';

@Component({
  selector: 'app-hero-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: './hero-edit.html',
  styleUrl: './hero-edit.css',
})
export class HeroEdit implements OnInit {
  hero: Hero = {
    id: -1,
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const foundHero = this.heroService.getHeroById(Number(id));
      if (foundHero) {
        this.hero = { ...foundHero };
      }
    }
  }

  salvaHero() {
    if (!this.hero.nome || !this.hero.potere) {
      alert("Compila tutti i campi");
      return;
    }

    if (this.hero.id === -1) {
      this.heroService.addHero(this.hero);
    } else {
      this.heroService.updateHero(this.hero);
    }

    this.router.navigate(['']);
  }

  reset() {
    if (this.hero.id !== -1) {
      this.hero = {
        id: this.hero.id,
        nome: "",
        potere: "",
        completata: false
      }
    }
    else {
      this.hero = {
        id: -1,
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
