import { Component, OnInit } from '@angular/core';
import { mensajeAleatorio } from 'src/app/utils/utils';
import {
  CdkDragDrop,
  CdkDragMove,
  CdkDragStart,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

interface ImageBox {
  index: number; // índice “correcto” de la pieza
  x_pos: string; // background-position-x (en %)
  y_pos: string; // background-position-y (en %)
}

class ImageBox {
  x_pos: string = '';
  y_pos: string = '';
  index: number = 0;
}

@Component({
  selector: 'app-puzzle-game',
  templateUrl: './puzzle-game.component.html',
  styleUrls: ['./puzzle-game.component.scss'],
})
export class PuzzleGameComponent {
  imageUrl: string = '';
  imageSize: number = 400;
  gridsize: number = 2;
  boxSize: number = 100 / (this.gridsize - 1);
  index: number = 0;
  totalBoxes: number = this.gridsize * this.gridsize;
  Image: any[] = [];
  imageName: string = this.imageUrl
    .substr(this.imageUrl.lastIndexOf('/') + 1)
    .split('.')[0];
  difficulty: string = '3';
  resuelto = false;
  mensajeResuelto = '';
  gameComplete: Boolean = false;
  private touchOriginId: string | null = null;

  indexes: number[] = [];
  position: number[] = [];

  images: string[] = [
    'img1.png',
    'img2.png',
    'img3.png',
    'img4.png',
    'img5.png',
    'img6.png',
    'img7.png',
    'img8.png',
  ];
  ngOnInit() {
    this.randonImg();
    this.startGame();
  }

  randonImg(): void {
    const randomIndex = Math.floor(Math.random() * this.images.length);
    const randomImage = this.images[randomIndex];
    this.imageUrl = `assets/img/puzzle/${randomImage}`;
  }

  isSorted(indexes: any[]): Boolean {
    let i: number = 0;
    for (i = 0; i < indexes.length; i++) {
      if (indexes[i] !== i) {
        return false;
      }
    }
    return true;
  }

  randomize(imageParts: any[]): any[] {
    let i = 0,
      img: any[] = [],
      ran = 0;
    for (i = 0; i < imageParts.length; i++) {
      ran = Math.floor(Math.random() * imageParts.length);
      while (imageParts[ran] == null) {
        ran = Math.floor(Math.random() * imageParts.length);
      }
      img.push(imageParts[ran]);
      this.position.push(imageParts[ran].index);
      imageParts[ran] = null;
    }
    this.printIndexes(this.indexes);
    this.printIndexes(this.position);
    return img;
  }

  onDragStart(event: DragEvent): void {
    const el = (event.target as HTMLElement).closest(
      'li.box'
    ) as HTMLElement | null;
    if (!event.dataTransfer || !el) return;
    event.dataTransfer.setData('data', el.id);
    event.dataTransfer.effectAllowed = 'move';
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const origin = event.dataTransfer?.getData('data');
    const destEl = (event.target as HTMLElement).closest(
      'li.box'
    ) as HTMLElement | null;
    const dest = destEl?.id || '';

    if (origin && dest) {
      this.swapTiles(origin, dest); // tu helper existente
    }
  }

  allowDrop(event: any): void {
    event.preventDefault();
    event.target.style.opacity = 1;
  }

  printIndexes(sorts: number[]): void {
    let i: number = 0,
      ind: string = '';
    for (i = 0; i < sorts.length; i++) {
      ind += sorts[i].toString() + ' , ';
    }
    console.log(ind);
  }

  reRandomize(): void {
    this.gameComplete = false;
    this.Image = this.randomize(this.Image);
  }

  startGame(): void {
    this.reset();
    this.initializeGame();
    this.breakImageParts();
    this.reRandomize();
  }

  breakImageParts(): void {
    for (this.index = 0; this.index < this.totalBoxes; this.index++) {
      const x: string = this.boxSize * (this.index % this.gridsize) + '%';
      const y: string =
        this.boxSize * Math.floor(this.index / this.gridsize) + '%';
      let img: ImageBox = new ImageBox();
      img.x_pos = x;
      img.y_pos = y;
      img.index = this.index;
      this.indexes.push(this.index);
      this.Image.push(img);
    }
    // this.boxSize = this.imageSize / this.gridsize;
  }

  initializeGame(): void {
    this.gridsize = Number(this.difficulty);
    console.log(this.gridsize);
    this.boxSize = 100 / (this.gridsize - 1);
    this.index = 0;
    this.totalBoxes = this.gridsize * this.gridsize;
  }

  reset(): void {
    this.Image = [];
    this.indexes = [];
    this.position = [];
  }

  restart(): void {
    this.randonImg();
    this.startGame();
  }

  private swapTiles(originId: string, destId: string): void {
    if (!originId || !destId || originId === destId) return;

    const originEl = document.getElementById(originId) as HTMLElement | null;
    const destEl = document.getElementById(destId) as HTMLElement | null;
    if (!originEl || !destEl) return;

    // Guarda ids numéricos ANTES de cambiarlos
    const from = Number(originEl.id);
    const to = Number(destEl.id);

    // Intercambia estilos (tu truco original)
    const origincss = originEl.style.cssText;
    const destcss = destEl.style.cssText;
    destEl.style.cssText = origincss;
    originEl.style.cssText = destcss;

    // Intercambia ids de los elementos
    originEl.id = String(destId);
    destEl.id = String(originId);

    // Actualiza el array de posiciones según “from” y “to”
    for (let i = 0; i < this.position.length; i++) {
      if (this.position[i] === from) this.position[i] = to;
      else if (this.position[i] === to) this.position[i] = from;
    }

    this.printIndexes(this.position);

    // ¿Ganó?
    this.gameComplete = this.isSorted(this.position);
    if (this.gameComplete) {
      setTimeout(() => (this.resuelto = true), 1000);
      this.mensajeResuelto = mensajeAleatorio();
    }
  }

  onPointerDown(ev: PointerEvent): void {
    if (!this.isCoarsePointer(ev)) return;            // <-- SOLO táctil
    const el = (ev.target as HTMLElement).closest('li.box') as HTMLElement | null;
    this.touchOriginId = el?.id ?? null;
    el?.setPointerCapture?.(ev.pointerId);
    ev.preventDefault();
  }
  
  onPointerUp(ev: PointerEvent): void {
    if (!this.isCoarsePointer(ev)) return;            // <-- SOLO táctil
    ev.preventDefault();
    if (!this.touchOriginId) return;
  
    const under = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null;
    const destEl = under?.closest('li.box') as HTMLElement | null;
  
    if (destEl?.id) {
      this.swapTiles(this.touchOriginId, destEl.id);  // tu helper existente
    }
    this.touchOriginId = null;
  }
  
  onPointerCancel(): void {
    this.touchOriginId = null;
  }

  private isCoarsePointer(ev?: PointerEvent): boolean {
    const coarse = window.matchMedia?.('(pointer: coarse)').matches;
    // fallback por si el navegador no soporta la media query
    return coarse || ev?.pointerType === 'touch';
  }
}
