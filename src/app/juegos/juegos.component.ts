import { Component } from '@angular/core';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent {
  items: any[] = [
    {
      titulo: 'MateKids 🧮',
      description: 'Responde desafíos rápidos de suma, resta, multiplicación y división y suma puntos.',
      routerLink: '/math-game'
    },
    {
      titulo: 'MemoKids 🧠',
      description: 'Da vuelta cartas y encuentra los pares iguales en el menor número de movimientos.',
      routerLink: '/memory-card-game'
    },
    {
      titulo: 'PuzzleKids 🧩',
      description: 'Reconstruye la imagen arrastrando y soltando las piezas hasta encajarla por completo.',
      routerLink: '/puzzle-game'
    },
    {
      titulo: 'CruciMate ✍️',
      description: 'Completa la cuadrícula colocando los números correctos para que todas las operaciones sean válidas.',
      routerLink: '/crossmath'
    },

  ];
  
}
