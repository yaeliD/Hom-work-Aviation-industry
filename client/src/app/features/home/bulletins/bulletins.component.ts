import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulletinComponent } from './bulletin/bulletin.component';
import { BulletinService } from '../../../core/services/bulletin.service';
import { BulletinFormComponent } from './bulletin/bulletin-form/bulletin-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-bulletins',
  standalone: true,
  imports: [
    CommonModule,
    BulletinComponent,
    MatIconModule,
    ReactiveFormsModule,
      MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './bulletins.component.html',
})
export class BulletinsComponent implements OnInit {
  constructor(
    public bulletinService: BulletinService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.bulletinService.loadAll(); // טען את המודעות
  }

  // פילטרים
  titleFilter = signal('');
  dateFilter = signal<string | null>(null);

  // פילטור מסודר
  filteredBulletins = computed(() => {
    const list = this.bulletinService.bulletins();
    const title = this.titleFilter().toLowerCase();
    const date = this.dateFilter() ? new Date(this.dateFilter()!) : null;

    return list.filter((b) => {
      const titleMatch = b.title.toLowerCase().includes(title);
      const dateMatch = date ? new Date(b.createdAt) >= date : true;
      return titleMatch && dateMatch;
    });
  });

  openCreate() {
    const ref = this.dialog.open(BulletinFormComponent, {
      data: { mode: 'create' },
    });
    ref.afterClosed().subscribe((result) => {
      if (result?.ok) {
        // כבר הטופס עדכן את ה-Signal דרך service, אין צורך בפעולה נוספת
      }
    });
  }
}
