import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professeur } from '../Modeles/Professeur';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {
  private apiUrl = 'http://localhost:3000/professeurs';

  constructor(private http: HttpClient) { }

  getAllProfesseurs(): Observable<Professeur[]> {
    return this.http.get<Professeur[]>('http://localhost:3000/professeurs');
  }

  getProfesseurByID(id: string): Observable<Professeur> {
    return this.http.get<Professeur>(`${this.apiUrl}/${id}`);
  }

  addProfesseur(professeur: Professeur): Observable<Professeur> {
    return this.http.post<Professeur>(this.apiUrl, professeur);
  }

  editProfesseur(professeur: Professeur): Observable<Professeur> {
    return this.http.put<Professeur>(`${this.apiUrl}/${professeur.id}`, professeur);
  }

  deleteProfesseur(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
