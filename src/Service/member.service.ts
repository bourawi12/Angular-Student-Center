import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/Modeles/Member';

// Decorator to inject the service into another service or component
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http: HttpClient) { }

  // Function that sends a GET request
  GetAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>('http://localhost:3000/members');
  }
  
  // Function that sends a GET member request
  getMemberByID(id:number): Observable<Member> {
    return this.http.get<Member>(`http://localhost:3000/members/${id}`);
  }

  // POST request
  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>('http://localhost:3000/members', member);
  }

  // DELETE request
  deleteElement(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/members/${id}`);
  }

  // PUT request to update a member
  editMember(member: Member): Observable<Member> {
    return this.http.put<Member>(`http://localhost:3000/members/${member.id}`, member);
  }
}
