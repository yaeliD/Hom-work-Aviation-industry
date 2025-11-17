import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bulletin } from '../models/bulletin.model';

@Injectable({
  providedIn: 'root'
})
export class BulletinService {

  private apiUrl = 'http://localhost:5203/api/bulletins'; // כתובת ה-API שלך

  constructor(private http: HttpClient) { }

  // GET all bulletins
  getAll(): Observable<Bulletin[]> {
    return this.http.get<Bulletin[]>(`${this.apiUrl}`);
  }

  // GET bulletin by id
  getById(id: number): Observable<Bulletin> {
    return this.http.get<Bulletin>(`${this.apiUrl}/${id}`);
  }

  // POST create new bulletin
  create(bulletin: Bulletin): Observable<Bulletin> {
    return this.http.post<Bulletin>(`${this.apiUrl}`, bulletin);
  }

  // PUT update bulletin
  update(id: number, bulletin: Bulletin): Observable<Bulletin> {
    return this.http.put<Bulletin>(`${this.apiUrl}/${id}`, bulletin);
  }

  // DELETE bulletin
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
