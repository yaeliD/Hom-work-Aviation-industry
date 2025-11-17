import { Component } from '@angular/core';
import { AuthService, UserCredentials } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
        //alert(`Logged in as ${this.auth.getCurrentUser().username}`);
      },
      error: (err: { error: any; }) => alert(err.error)
    });
  }
}
