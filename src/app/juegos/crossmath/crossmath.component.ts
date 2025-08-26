import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { mensajeAleatorio } from 'src/app/utils/utils';

type Op = '+' | '−';

interface Tile { id: string; value: number; }

interface Cell {
  id: string;
  r: number;
  c: number;
  type: 'num' | 'op' | 'eq' | 'void';
  text?: string;           // para operadores/igual
  given?: boolean;         // número fijo
  value?: number;          // si es fijo
  bag?: Tile[];            // para huecos
}

@Component({
  selector: 'app-crossmath',
  templateUrl: './crossmath.component.html',
  styleUrls: ['./crossmath.component.scss']
})
export class CrossmathComponent implements OnInit {

  readonly MAX = 20;

  left: Cell[] = [];        // tablero 5x5
  pool: Tile[] = [];        // opciones (5)
  connected: string[] = []; // ids de listas conectadas
  private eqs: Array<() => boolean> = [];
  statusMsg = '';rows = [0, 1, 2, 3, 4];
  resuelto: boolean = false
  mensajeResuelto = ''
  mensajeAleatorio = mensajeAleatorio
  err = false
  @ViewChild('crossmathWrapper', { static: true }) crossmathWrapper!: ElementRef;

  rowCells(r: number) {
    // 5 celdas por fila, en orden de columna
    return this.left.filter(c => c.r === r).sort((a, b) => a.c - b.c);
  }

  ngOnInit(): void { this.newGame(); }

  // =================== Generación ===================
  newGame(): void {
    this.statusMsg = '';

    // Números/operadores (sin columna derecha)
    const { A, B, C, D, E, F, G, H, K, op1, op2, op3, op4, op5 } = this.generateNumbers();

    // Tablero 5x5 con la forma de la imagen
    this.left = [
      this.cellNum('A', 0, 0, false),                 // A (hueco)
      this.cellOp('op1', 0, 1, op1),
      this.cellNum('B', 0, 2, false),                 // B (hueco)
      this.cellEq(0, 3),
      this.cellNumFixed('C', 0, 4, C),

      this.cellOp('op2', 1, 0, op2),
      this.void(1, 1),
      this.cellOp('op4', 1, 2, op4),
      this.void(1, 3),
      this.void(1, 4),

      this.cellNum('D', 2, 0, false),                 // D (hueco)
      this.cellOp('op3', 2, 1, op3),
      this.cellNum('F', 2, 2, false),                 // F (hueco)
      this.cellEq(2, 3),
      this.cellNumFixed('K', 2, 4, K),

      this.cellEq(3, 0),
      this.void(3, 1),
      this.cellEq(3, 2),
      this.void(3, 3),
      this.void(3, 4),

      this.cellNumFixed('E', 4, 0, E),
      this.cellOp('op5', 4, 1, op5),
      this.cellNumFixed('G', 4, 2, G),
      this.cellEq(4, 3),
      this.cellNum('H', 4, 4, false),                 // H (hueco)
    ];

    // Huecos que el jugador debe completar (exactamente 5)
    const holes = ['A','B','D','F','H']
      .map(id => this.left.find(c => c.id === id)!)
      .map(c => (c.bag = [], c)); // asegurar bag:[]

    this.connected = ['POOL', ...holes.map(h => this.dropId(h.id))];

    // Bandeja (5 fichas)
    const blanks = [
      { id: 'A', value: A }, { id: 'B', value: B },
      { id: 'D', value: D }, { id: 'F', value: F }, { id: 'H', value: H }
    ];
    this.pool = this.shuffle(blanks.map((b, i) => ({ id: b.id + '_' + i, value: b.value })));

    // Validadores
    this.eqs = [
      () => this.ok(this.val('A'), op1, this.val('B'), C), // fila 0
      () => this.ok(this.val('A'), op2, this.val('D'), E), // col 0
      () => this.ok(this.val('D'), op3, this.val('F'), K), // fila 2
      () => this.ok(this.val('B'), op4, this.val('F'), G), // col 2
      () => this.ok(E, op5, G, this.val('H')),             // fila 4
    ];
  }

  private generateNumbers(): {
    A:number; B:number; C:number; D:number; E:number; F:number; G:number; H:number; K:number;
    op1:Op; op2:Op; op3:Op; op4:Op; op5:Op;
  } {
    while (true) {
      const A = this.rand(1, this.MAX);
      const { op: op1, b: B, r: C } = this.pickUsingLeft(A);
  
      const { op: op2, b: D, r: E } = this.pickUsingLeft(A);
      const { op: op4, b: F, r: G } = this.pickUsingLeft(B);
  
      const p1 = this.pickForPair(D, F); // -> op3/K
      const p2 = this.pickForPair(E, G); // -> op5/H
  
      if (p1 && p2) {
        const { op: op3, r: K } = p1;
        const { op: op5, r: H } = p2;
  
        // (opcional) aserción de coherencia
        // if (!(this.ok(A, op1, B, C) && this.ok(A, op2, D, E) && this.ok(D, op3, F, K) && this.ok(B, op4, F, G) && this.ok(E, op5, G, H))) continue;
  
        return { A,B,C,D,E,F,G,H,K,op1,op2,op3,op4,op5 };
      }
      // si alguna pareja no tiene operación válida, reintentamos con nuevos números
    }
  }

  // Solo suma y resta respecto al valor de la izquierda
  private pickUsingLeft(a: number): { op: Op; b: number; r: number } {
    const cand: Array<{op:Op;b:number;r:number}> = [];
    if (a < this.MAX) {
      const b = this.rand(1, this.MAX - a);
      cand.push({ op: '+' as Op, b, r: a + b });
    }
    if (a > 1) {
      const b = this.rand(1, a - 1);
      cand.push({ op: '−' as Op, b, r: a - b });
    }
    return this.pick(cand);
  }

  // Solo suma y resta para pares (resultado natural y dentro de MAX)
  private pickForPair(a: number, b: number): { op: Op; r: number } | null {
    const opts: Array<{ op: Op; r: number }> = [];
    if (a + b <= this.MAX) opts.push({ op: '+' as Op, r: a + b });
    if (a > b && a - b >= 1) opts.push({ op: '−' as Op, r: a - b });
    return opts.length ? this.pick(opts) : null; // si no hay opción, devolvemos null
  }

  // =================== Drag & Drop ===================
  drop(event: CdkDragDrop<Tile[]>, target?: Cell) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (target?.bag?.length) {
        const [existing] = target.bag.splice(0,1);
        this.pool.push(existing);
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // =================== Comprobación ===================
  check(): void {
    this.err = false
    const holesFilled = ['A','B','D','F','H']
      .every(id => this.left.find(c => c.id===id)!.bag!.length === 1);
    if (!holesFilled) { this.statusMsg = 'Completa todas las casillas.'; return; }
    const ok = this.eqs.every(fn => fn());
    this.resuelto = true
    if(ok) {
      this.mensajeResuelto = this.mensajeAleatorio()
    } else {
      this.mensajeResuelto = 'Upss... Hay algunos errores, revisa de nuevo 🔍😃'
      this.err = true
    }
  }

  reset(): void {
    ['A','B','D','F','H'].forEach(id => {
      const c = this.left.find(x => x.id === id)!;
      if (c.bag && c.bag.length) this.pool.push(c.bag[0]);
      c.bag = [];
    });
    this.statusMsg = '';
  }

  // =================== utils render ===================
  dropId(id:string){ return `DL_${id}`; }
  val(id:string, fallback?:number): number {
    const c = this.left.find(x => x.id === id);
    if (!c) return Number.NaN;
    if (c.given) return c.value!;
    return c.bag?.[0]?.value ?? (fallback ?? Number.NaN);
  }
  ok(a:number, op:Op, b:number, r:number): boolean {
    if ([a,b,r].some(x => Number.isNaN(x))) return false;
    switch (op) {
      case '+': return a + b === r;
      case '−': return a - b === r;
    }
  }

  // fábricas de celdas
  private cellNum(id:string, r:number, c:number, given:boolean): Cell {
    return given ? { id, r, c, type:'num', given:true }
                 : { id, r, c, type:'num', given:false, bag: [] };
  }
  private cellNumFixed(id:string, r:number, c:number, value:number): Cell {
    return { id, r, c, type:'num', given:true, value };
  }
  private cellOp(id:string, r:number, c:number, text:Op): Cell {
    return { id, r, c, type:'op', text };
  }
  private cellEq(r:number, c:number): Cell {
    return { id: `EQ_${r}_${c}`, r, c, type:'eq', text:'=' };
  }
  private void(r:number, c:number): Cell {
    return { id: `VOID_${r}_${c}`, r, c, type:'void' };
  }

  // comunes
  private rand(min:number,max:number){ return Math.floor(Math.random()*(max-min+1))+min; }
  private pick<T>(arr:T[]):T{ return arr[Math.floor(Math.random()*arr.length)]; }
  private shuffle<T>(arr:T[]):T[]{ return arr.map(v=>[Math.random(),v] as [number,T]).sort((a,b)=>a[0]-b[0]).map(p=>p[1]); }

}
