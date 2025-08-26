import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  off: boolean = true
  aboutAs: boolean = false
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;

  iniciarMusica() {
    this.off = false
    const audio = this.audioPlayerRef.nativeElement;
    audio.play().catch(error => {
      console.error('Error al reproducir el audio:', error);
    });
  }
  
  pararMusica(): void {
    this.off = true
    const audio = this.audioPlayerRef.nativeElement;
    audio.pause(); // Pausa la reproducción
    audio.currentTime = 0; // Opcional: reinicia la música al inicio
  }
  
}
