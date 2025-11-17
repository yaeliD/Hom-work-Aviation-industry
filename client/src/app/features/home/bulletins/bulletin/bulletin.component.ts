import { Component, Input } from '@angular/core';
import { Bulletin } from '../../../../core/models/bulletin.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bulletin',
  imports: [CommonModule],
  templateUrl: './bulletin.component.html',
  styleUrl: './bulletin.component.css'
})
export class BulletinComponent {
  @Input() bulletin!: Bulletin;
}
