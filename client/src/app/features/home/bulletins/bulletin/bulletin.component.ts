import { Component, Input } from '@angular/core';
import { Bulletin } from '../../../../core/models/bulletin.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BulletinService } from '../../../../core/services/bulletin.service';

@Component({
  selector: 'app-bulletin',
  imports: [CommonModule, MatIconModule],
  templateUrl: './bulletin.component.html',
  styleUrl: './bulletin.component.css'
})
export class BulletinComponent {
  @Input() bulletin!: Bulletin;

  constructor(private bulletinService: BulletinService) {}

  deleteBulletin(id: number) {
    this.bulletinService.delete(id);
  }
}
