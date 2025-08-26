import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JuegosComponent } from './juegos/juegos.component';
import { MemoryCardGameComponent } from './juegos/memory-card-game/memory-card-game.component';
import { PuzzleGameComponent } from './juegos/puzzle-game/puzzle-game.component';
import { MathQuizzComponent } from './juegos/math-quizz/math-quizz.component';
import { CrossmathComponent } from './juegos/crossmath/crossmath.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: 'juegos',
    component: JuegosComponent
  },
  {
    path: 'memory-card-game',
    component: MemoryCardGameComponent
  },
  {
    path: 'puzzle-game',
    component: PuzzleGameComponent
  },
  {
    path: 'math-game',
    component: MathQuizzComponent
  },
  {
    path: 'crossmath',
    component: CrossmathComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
