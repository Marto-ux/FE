import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private baseUrl = 'http://localhost:8080/api/confirmados';

  constructor(private http: HttpClient) { }

  confirmarInvitacion(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.baseUrl}`, persona);
  }
}