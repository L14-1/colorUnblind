import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { lastValueFrom, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JWT_TOKENS } from '../../constants/localstorage.constant';
import { IAccessToken } from '../../interfaces/access-token.interface';
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
  public isPro = signal(false);

  public async isUserLoggedIn() {
    const storedTokens = localStorage.getItem(JWT_TOKENS);
    if (storedTokens) {
      const tokens: ITokensDto = JSON.parse(storedTokens);
      const currentTime = Math.floor(Date.now() / 1000);
      if (tokens.accessToken) {
        const decodedtoken: IAccessToken = jwtDecode(tokens.accessToken);
        if (decodedtoken.exp > currentTime) {
          this.loggedIn.set(true);
        } else {
          await lastValueFrom(this.refreshToken(tokens));
        }
      } else {
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  public getTokens(): ITokensDto | null {
    const tokens = localStorage.getItem(JWT_TOKENS);
    if (tokens) {
      const parsedTokens: ITokensDto = JSON.parse(tokens);
      return parsedTokens;
    }
    return null;
  }

  public logout(): void {
    localStorage.removeItem(JWT_TOKENS);
    this.loggedIn.set(false);
  }

  public refreshToken(tokens: ITokensDto) {
    return this.http
      .get<ITokensDto>(`${this.apiUrl}/auth/refresh/${tokens.refreshToken}`)
      .pipe(
        tap({
          next: (newTokens) => {
            this.loggedIn.set(true);
            localStorage.setItem(JWT_TOKENS, JSON.stringify(newTokens));
          },
          error: () => {
            this.logout();
          },
        }),
      );
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
