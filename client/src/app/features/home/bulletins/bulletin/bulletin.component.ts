import { Component, Input, signal } from '@angular/core';
import { Bulletin } from '../../../../core/models/bulletin.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BulletinService } from '../../../../core/services/bulletin.service';
import { MatDialog } from '@angular/material/dialog';
import { BulletinFormComponent } from './bulletin-form/bulletin-form.component';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../../../core/services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-bulletin',
  standalone: true,
  imports: [CommonModule, MatIconModule,  MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.css'],
})

export class BulletinComponent {
  @Input() bulletin!: Bulletin;
  userId = signal<number>(0);

  constructor(
    private bulletinService: BulletinService,
    private dialog: MatDialog,
    private auth: AuthService
  ) {
    const token = this.auth.getToken();
  if (token) {
    const decoded: any = jwtDecode(token);
    this.userId.set(decoded.userId);
  }
  }

  deleteBulletin(id: number) {
    this.bulletinService.delete(id);
  }

  openEdit(b: Bulletin) {
    const ref = this.dialog.open(BulletinFormComponent, {
      data: { mode: 'edit', bulletin: b },
    });

    ref.afterClosed().subscribe((result) => {
      if (result?.ok) {
      }
    });
  }
}
