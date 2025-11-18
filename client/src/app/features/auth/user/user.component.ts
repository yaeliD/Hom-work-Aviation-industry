import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { MatCard } from "@angular/material/card";
import { MatTabsModule } from '@angular/material/tabs';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-user',
  imports: [LoginComponent,RegisterComponent, MatCard, MatTabsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
