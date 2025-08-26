import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private http: HttpClient) {}

  obtenerPreguntas(): Observable<any> {
    return this.http.get<any>('assets/json/matekids.json');
  }
}