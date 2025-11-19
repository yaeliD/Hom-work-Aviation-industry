import { Component } from '@angular/core';
import { AuthService, UserCredentials } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardContent, MatCard, MatCardHeader, MatCardTitle } from "@angular/material/card";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatGridListModule, MatDatepickerModule,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatCardTitle
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
 form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const credentials: UserCredentials = this.form.value;
    this.auth.login(credentials).subscribe({
      next: (res: { token: any; }) => {
        this.auth.setToken(res.token);
        this.router.navigate(['/home']);
      },
      error: (err: { error: any; }) => alert(err.error)
    });
  }
}
