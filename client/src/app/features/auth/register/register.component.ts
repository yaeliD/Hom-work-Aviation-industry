import { Component } from '@angular/core';
import { AuthService, UserCredentials } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardContent, MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
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
    MatGridListModule, 
    MatDatepickerModule,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatCardTitle
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const credentials: UserCredentials = this.form.value;
    this.auth.register(credentials).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        //alert('User registered successfully!');
      },
      error: (err: { error: any; }) => alert(err.error)
    });
  }
}
