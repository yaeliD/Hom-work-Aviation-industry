import { Component } from '@angular/core';
import { Bulletin } from '../../../core/models/bulletin.model';
import { BulletinService } from '../../../core/services/bulletin.service';
import { BulletinComponent } from './bulletin/bulletin.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bulletins',
  imports: [BulletinComponent, CommonModule],
  templateUrl: './bulletins.component.html',
  styleUrl: './bulletins.component.css'
})
export class BulletinsComponent {
    bulletins: Bulletin[] = [];

  constructor(private bulletinService: BulletinService) {}

  ngOnInit(): void {
    this.bulletins = this.bulletinService.getBulletins();
  }
}
