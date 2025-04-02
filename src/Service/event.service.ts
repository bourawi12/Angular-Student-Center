import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Evt } from 'src/Modeles/Evt';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  // Function that sends a GET request
    GetAllEvents(): Observable<Evt[]> {
      return this.http.get<Evt[]>('http://localhost:3000/Evt');
    }

    // Function that sends a GET member request
      getEventByID(id:String): Observable<Evt> {
        return this.http.get<Evt>(`http://localhost:3000/Evt/${id}`);
      }
  
    // POST request
      addEvent(event: Evt): Observable<Evt> {
        return this.http.post<Evt>('http://localhost:3000/Evt', event);
      }
    // DELETE request
  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/Evt/${id}`);
  }

  // PUT request to update a member
    editEvent(event: Evt): Observable<Evt> {
      return this.http.put<Evt>(`http://localhost:3000/Evt/${event.id}`, event);
    }
    updateEvt(id: String, updatedData: any): Observable<any> {
      return this.http.put(`http://localhost:3000/Evt/${id}`, updatedData); // Send a PUT request to update the event
    }

  // In your EventService
toggleVisibility(id: string, visibility: boolean): Observable<Evt> {
  return this.http.patch<Evt>(`http://localhost:3000/Evt/${id}`, { visibility });
}
}
