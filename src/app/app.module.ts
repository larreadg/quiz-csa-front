import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JuegosComponent } from './juegos/juegos.component'
import { MemoryCardGameComponent } from './juegos/memory-card-game/memory-card-game.component';
import { PuzzleGameComponent } from './juegos/puzzle-game/puzzle-game.component';
import { MathQuizzComponent } from './juegos/math-quizz/math-quizz.component'
import { CrossmathComponent } from './juegos/crossmath/crossmath.component';

// Primeng
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { SpeedDialModule } from 'primeng/speeddial';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JuegosComponent,
    MemoryCardGameComponent,
    PuzzleGameComponent,
    MathQuizzComponent,
    CrossmathComponent
  ],
  imports: [
    ButtonModule,
    CardModule,
    CarouselModule,
    DialogModule,
    TooltipModule,
    SpeedDialModule,
    // Otros
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
