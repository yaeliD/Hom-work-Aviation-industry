import { Component } from '@angular/core';
import { BulletinsComponent } from "./bulletins/bulletins.component";

@Component({
  selector: 'app-home',
  imports: [BulletinsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
