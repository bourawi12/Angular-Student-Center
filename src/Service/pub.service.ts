import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { Observable } from 'rxjs';  // Import Observable
import { Pub } from 'src/Modeles/Pub';  // Assuming you have a Pub model


@Injectable({
  providedIn: 'root'
})
export class PubService {
  constructor(private http: HttpClient) { }
  // Function to send a GET request
  GetAllPub(): Observable<Pub[]> {
    return this.http.get<Pub[]>('http://localhost:3000/Pub');
  }
}
