import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from 'src/Modeles/Etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  
    constructor(private http: HttpClient) { }
  
    // Function that sends a GET request
    GetAllEtudiants(): Observable<Etudiant[]> {
      return this.http.get<Etudiant[]>('http://localhost:3000/Etudiant');
    }
    
    // Function that sends a GET etudiant request
    getEtudiantByID(id:number): Observable<Etudiant> {
      return this.http.get<Etudiant>(`http://localhost:3000/Etudiant/${id}`);
    }
  
    // POST request
    addEtudiant(etudiant: Etudiant): Observable<Etudiant> {
      return this.http.post<Etudiant>('http://localhost:3000/Etudiant', etudiant);
    }
  
    // DELETE request
    deleteElement(id: string): Observable<void> {
      return this.http.delete<void>(`http://localhost:3000/Etudiant/${id}`);
    }
  
    // PUT request to update a etudiant
    editEtudiant(etudiant: Etudiant): Observable<Etudiant> {
      return this.http.put<Etudiant>(`http://localhost:3000/Etudiant/${etudiant.id}`, etudiant);
    }
}
