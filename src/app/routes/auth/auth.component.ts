import { Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { lastValueFrom } from 'rxjs';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { GoogleAuthService } from './services/google-auth.service';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-auth',
  imports: [
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    Button,
    DividerModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  public isLogin = signal(true);
  public isLoading = signal(false);
  private googleAuthService = inject(GoogleAuthService);
  private authService = inject(AuthService);
  public location = inject(Location);

  public googleLogin() {
    this.isLoading.set(true);
    this.googleAuthService
      .loginWithGoogle()
      .then(async (token) => {
        try {
          await lastValueFrom(this.authService.googleLogin(token));
          this.location.back();
          this.isLoading.set(false);
        } catch (error) {
          this.isLoading.set(false);
        }
      })
      .catch((err) => {
        this.isLoading.set(false);
      });
  }
}
