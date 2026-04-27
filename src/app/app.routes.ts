import { Routes } from '@angular/router';
import { HeroList } from './hero-list/hero-list';
import { HeroEdit } from './hero-edit/hero-edit';

export const routes: Routes = [
  { path: '', component: HeroList },
  { path: 'edit/:id', component: HeroEdit }
];


