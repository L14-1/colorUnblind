import { Location } from '@angular/common';
import { Component, inject, model, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import {
  IconAlertSquareRounded,
  IconArrowRight,
} from 'angular-tabler-icons/icons';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../auth.service';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabel,
    PasswordModule,
    Button,
    TablerIconComponent,
    Message,
  ],
  providers: [provideTablerIcons({ IconArrowRight, IconAlertSquareRounded })],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private readonly authService = inject(AuthService);
  public isLoginPage = model(true);
  public location = inject(Location);
  public isLoading = signal(false);
  public invalidSignup = signal(false);

  public form = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,64})/),
    ]),
  });

  public signup() {
    if (!this.form.valid) return;
    const { username, email, password } = this.form.value;
    if (!username || !email || !password) return;
    this.invalidSignup.set(false);

    this.isLoading.set(true);

    this.authService.signup({ username, email, password }).subscribe({
      next: (tokens) => {
        this.isLoading.set(false);
        this.location.back();
      },
      error: (error) => {
        this.isLoading.set(false);
        this.invalidSignup.set(true);
      },
    });
  }
}
