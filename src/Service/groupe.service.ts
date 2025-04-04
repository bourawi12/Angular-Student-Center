import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Groupe } from 'src/Modeles/Groupe';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  
    constructor(private http: HttpClient) { }
  
    // Function that sends a GET request
    GetAllGroupes(): Observable<Groupe[]> {
      return this.http.get<Groupe[]>('http://localhost:3000/groupes');
    }
    
    // Function that sends a GET groupe request
    getGroupeByID(id: number): Observable<Groupe> {
      return this.http.get<Groupe>(`http://localhost:3000/groupes/${id}`);
    }
  
    // POST request
    addGroupe(groupe: Groupe): Observable<Groupe> {
      return this.http.post<Groupe>('http://localhost:3000/groupes', groupe);
    }
  
    // DELETE request
    deleteGroupe(id: string): Observable<void> {
      return this.http.delete<void>(`http://localhost:3000/groupes/${id}`);
    }
  
    // PUT request to update a groupe
    editGroupe(groupe: Groupe): Observable<Groupe> {
      return this.http.put<Groupe>(`http://localhost:3000/groupes/${groupe.id}`, groupe);
    }
}