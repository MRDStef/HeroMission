import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../model/hero.model';


@Component({
  selector: 'app-hero-card',
  imports: [],
  templateUrl: './hero-card.html',
  styleUrl: './hero-card.css',
})
export class HeroCard {
  @Input() hero!: Hero;

  @Output() onMissionDone = new EventEmitter<Hero>();
  @Output() onEdit = new EventEmitter<Hero>();

  notifyParent(): void{
    this.onMissionDone.emit(this.hero);
  }

  editHero(): void {
    this.onEdit.emit(this.hero);
  }
}

