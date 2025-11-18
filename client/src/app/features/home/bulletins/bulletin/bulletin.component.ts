import { Component, Input } from '@angular/core';
import { Bulletin } from '../../../../core/models/bulletin.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BulletinService } from '../../../../core/services/bulletin.service';
import { MatDialog } from '@angular/material/dialog';
import { BulletinFormComponent } from './bulletin-form/bulletin-form.component';

@Component({
  selector: 'app-bulletin',
  imports: [CommonModule, MatIconModule],
  templateUrl: './bulletin.component.html',
  styleUrl: './bulletin.component.css'
})
export class BulletinComponent {
  @Input() bulletin!: Bulletin;

  constructor(private bulletinService: BulletinService, private dialog: MatDialog) {}

  deleteBulletin(id: number) {
    this.bulletinService.delete(id);
  }
  openEdit(b: Bulletin) {
    const ref = this.dialog.open(BulletinFormComponent, {
      data: { mode: 'edit', bulletin: b }
    });

    ref.afterClosed().subscribe(result => {
      if (result?.ok) {
        // העדכון כבר בוצע דרך ה-service
      }
    });
  }

  
}
