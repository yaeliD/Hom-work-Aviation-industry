import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulletinComponent } from './bulletin/bulletin.component';
import { BulletinService } from '../../../core/services/bulletin.service';
import { BulletinFormComponent } from './bulletin/bulletin-form/bulletin-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bulletins',
  standalone: true,
  imports: [CommonModule, BulletinComponent,MatIconModule],
  templateUrl: './bulletins.component.html'
})
export class BulletinsComponent implements OnInit {

  constructor(public bulletinService: BulletinService, private dialog: MatDialog,
) {}

  ngOnInit(): void {
    this.bulletinService.loadAll(); // טען את המודעות
  }

    openCreate() {
    const ref = this.dialog.open(BulletinFormComponent, {
      data: { mode: 'create' }
    });
    ref.afterClosed().subscribe(result => {
      if (result?.ok) {
        // כבר הטופס עדכן את ה-Signal דרך service, אין צורך בפעולה נוספת
      }
    });
  }
}
