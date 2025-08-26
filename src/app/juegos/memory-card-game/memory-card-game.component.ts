import { Component, OnInit } from '@angular/core';
import { mensajeAleatorio } from 'src/app/utils/utils';

interface Card {
  id: number;
  image: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-memory-card-game',
  templateUrl: './memory-card-game.component.html',
  styleUrls: ['./memory-card-game.component.scss']
})
export class MemoryCardGameComponent implements OnInit {
  cards: Card[] = [];
  flippedCards: Card[] = [];
  lockBoard = false;
  resuelto = false;
  mensajeResuelto = '';

  ngOnInit() {
    this.initializeCards();
  }

  initializeCards() {
    // Pool de ~20 emojis
    const masterImages = [
      '🍎','🍌','🍇','🍊','🍓','🍒','🍍','🥝','🍉','🍋',
      '🍑','🍈','🍐','🍏','🍅','🍆','🥑','🥦','🌽','🥕'
    ];
    // Seleccionar 8 emojis únicos al azar
    const selectedImages = masterImages
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
    let id = 0;
    // Crear pares y mezclar
    this.cards = selectedImages
      .flatMap(image => [
        { id: id++, image, flipped: false, matched: false },
        { id: id++, image, flipped: false, matched: false }
      ])
      .sort(() => Math.random() - 0.5);
  }

  flipCard(card: Card) {
    if (this.lockBoard || card.flipped || card.matched) return;
    card.flipped = true;
    this.flippedCards.push(card);
    if (this.flippedCards.length === 2) {
      this.checkForMatch();
    }
  }

  checkForMatch() {
    const [card1, card2] = this.flippedCards;
    if (card1.image === card2.image) {
      card1.matched = true;
      card2.matched = true;
      this.resetBoard();
      this.checkSolved();
    } else {
      this.lockBoard = true;
      setTimeout(() => {
        card1.flipped = false;
        card2.flipped = false;
        this.resetBoard();
      }, 1000);
    }
  }

  resetBoard() {
    this.flippedCards = [];
    this.lockBoard = false;
  }

  restart() {
    this.initializeCards();
    this.resetBoard();
  }

  checkSolved() {
    const allMatched = this.cards.every(c => c.matched);
    if (allMatched) {
      this.mensajeResuelto = mensajeAleatorio();
      // pequeño delay para que se vea el último par volteado
      setTimeout(() => this.resuelto = true, 1000);
    }
  }
}

