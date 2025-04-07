import { Component, signal } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-auth',
  imports: [HeaderComponent, LoginComponent, SignupComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  public isLogin = signal(true);
}
