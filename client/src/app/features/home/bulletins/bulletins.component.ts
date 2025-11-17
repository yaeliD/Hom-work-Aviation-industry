import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulletinComponent } from './bulletin/bulletin.component';
import { BulletinService } from '../../../core/services/bulletin.service';

@Component({
  selector: 'app-bulletins',
  standalone: true,
  imports: [CommonModule, BulletinComponent],
  templateUrl: './bulletins.component.html'
})
export class BulletinsComponent implements OnInit {

  constructor(public bulletinService: BulletinService) {}

  ngOnInit(): void {
    this.bulletinService.loadAll(); // טען את המודעות
  }
}
