import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { JWT_TOKENS } from '../../../constants/localstorage.constant';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabel,
    PasswordModule,
    Button,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  public isLoading = signal(false);

  public form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('null', [
      Validators.required,
      // Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,64})/g),
    ]),
  });

  public login() {
    if (!this.form.valid) return;
    const { email, password } = this.form.value;
    if (!email || !password) return;

    this.isLoading.set(true);

    this.authService.login({ email, password }).subscribe({
      next: (tokens) => {
        this.isLoading.set(false);
        // Redirect to last detail page || dashboard;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading.set(false);
        // Handle error
      },
    });
  }
}
