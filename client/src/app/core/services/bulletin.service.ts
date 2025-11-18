import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bulletin } from '../models/bulletin.model';

@Injectable({
  providedIn: 'root',
})
export class BulletinService {

  private apiUrl = 'http://localhost:5203/api/bulletins';

  // Signal שמכיל את המודעות
  bulletins = signal<Bulletin[]>([]);
  saveComplete = signal(false);

  notifySuccess() {
    this.saveComplete.set(true);
  }
  resetSaveFlag() {
    this.saveComplete.set(false);
  }

  constructor(private http: HttpClient) {}

  // טען את כל המודעות מהשרת
  loadAll(): void {
    this.http.get<Bulletin[]>(this.apiUrl).subscribe({
      next: (data) => {this.bulletins.set([...data]), console.log(data,this.bulletins());
      },
      error: (err) => console.error(err),
    });
  }

  create(bulletin: Bulletin) {
    console.log(bulletin);

    this.http.post<Bulletin>(this.apiUrl, bulletin).subscribe({
      next: (newBulletin) => {
        this.notifySuccess();
        this.bulletins.update((list) => [...list, newBulletin]);
      },
      error: (err: { error: any }) => {
        console.error(err);
        alert(err?.error ?? 'שגיאה ביצירת מודעה');
      },
    });
  }

  update(id: number, bulletin: Bulletin) {
    this.http.put<Bulletin>(`${this.apiUrl}/${id}`, bulletin).subscribe({
      next: (updated) => {
        this.notifySuccess(),
        this.bulletins.update((list) =>
          list.map((b) => (b.id === id ? updated : b))
        );
      },
      error: (err: { error: any }) => {
        console.error(err);
        alert(err?.error ?? 'שגיאה בעדכון מודעה');
      },
    });
  }

  delete(id: number) {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe({
      next: () =>
        this.bulletins.update((list) => list.filter((b) => b.id !== id)),
      error: (err) => console.error(err),
    });
  }
}
