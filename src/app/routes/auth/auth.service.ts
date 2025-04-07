import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JWT_TOKENS } from '../../constants/localstorage.constant';
import { ILoginDto } from '../../interfaces/login-dto.interface';
import { ISignupDto } from '../../interfaces/signup-dto.interface';
import { ITokensDto } from '../../interfaces/tokens-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public loggedIn = signal(false);

  public logout(): void {
    localStorage.removeItem(JWT_TOKENS);
    this.loggedIn.set(false);
  }

  public login(credentials: ILoginDto): Observable<ITokensDto> {
    return this.http
      .post<ITokensDto>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((tokens) => {
          this.loggedIn.set(true);
          localStorage.setItem(JWT_TOKENS, JSON.stringify(tokens));
        }),
      );
  }

  public signup(credentials: ISignupDto): Observable<ITokensDto> {
    return this.http
      .post<ITokensDto>(`${this.apiUrl}/auth/signup`, credentials)
      .pipe(
        tap((tokens) => {
          this.loggedIn.set(true);
          localStorage.setItem(JWT_TOKENS, JSON.stringify(tokens));
        }),
      );
  }
}
