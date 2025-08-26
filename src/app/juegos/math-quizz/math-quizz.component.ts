import { Component, ViewChild } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { LocalService } from 'src/app/services/local.service';
import { formatearPreguntasAleatorias, mensajeAleatorio } from 'src/app/utils/utils';

@Component({
  selector: 'app-math-quizz',
  templateUrl: './math-quizz.component.html',
  styleUrls: ['./math-quizz.component.scss']
})
export class MathQuizzComponent {
  
  preguntas: any[] = []
  respuestas: any[] = []
  gameComplete: boolean = false
  score: number = 0
  scoreMessage: string = ''
  currentIndex: number = 0
  @ViewChild('carousel') carousel!: Carousel;
  resuelto = false;
  mensajeResuelto = '';

  constructor(private localService: LocalService){
    this.obtenerPreguntas()
  }

  obtenerPreguntas = () => {
    this.gameComplete = false
    this.preguntas = []
    this.respuestas = []
    this.score = 0
    this.scoreMessage = ''
    this.localService.obtenerPreguntas().subscribe(data => {
      this.preguntas = [...formatearPreguntasAleatorias(data)] 
      this.respuestas = new Array(this.preguntas.length).fill(null)
    })
  }

  procesarRespuesta = (respuesta: any, pregunta: any) => {
    let index = this.preguntas.indexOf(pregunta)
    this.respuestas[index] = pregunta.respuestas[pregunta.correcta] === respuesta ? 1 : 0
    
    if(index === 9) {
      this.carousel.page = 0
      this.gameComplete = true
      this.score = this.respuestas.reduce((prev, curr) => {
        return prev + curr
      })

      if (this.score <= 4) {
        this.scoreMessage = '🧠 ¡Buen intento! El juego ha terminado. Seguí practicando y vas a ser un genio de las mates 🤓💪';
      } else if (this.score > 4 && this.score <= 7) {
        this.scoreMessage = '🎯 ¡Muy bien! El juego ha terminado y lo hiciste genial 🙌🌟 ¿Listo para seguir mejorando?';
      } else {
        this.scoreMessage = '🏆 ¡Excelente! Terminaste el juego como un verdadero campeón de las matemáticas 🎉🧠 ¡Sos increíble!';
      }

      this.mensajeResuelto = mensajeAleatorio()
      this.resuelto = true
    } else {
      this.carousel.navForward({} as any)
    }
  }

}
