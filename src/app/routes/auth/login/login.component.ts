import { Location } from '@angular/common';
import { Component, inject, model, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconArrowRight } from 'angular-tabler-icons/icons';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabel,
    PasswordModule,
    Button,
    TablerIconComponent,
  ],
  providers: [provideTablerIcons({ IconArrowRight })],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  public isLoginPage = model(true);
  public location = inject(Location);
  public isLoading = signal(false);

  public form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  public login() {
    if (!this.form.valid) return;
    const { email, password } = this.form.value;
    if (!email || !password) return;

    this.isLoading.set(true);

    this.authService.login({ email, password }).subscribe({
      next: (tokens) => {
        this.isLoading.set(false);
        this.location.back();
      },
      error: (error) => {
        this.isLoading.set(false);
        // Handle error
      },
    });
  }
}
