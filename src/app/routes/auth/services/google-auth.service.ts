import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

declare const chrome: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private clientId = environment.googleClientId || '';
  private scopes = ['profile', 'email'];
  private redirectUri = chrome.identity.getRedirectURL('google');

  public loginWithGoogle(): Promise<string> {
    return new Promise((resolve, reject) => {
      const authUrl = this.buildAuthUrl();

      chrome.identity.launchWebAuthFlow(
        {
          url: authUrl,
          interactive: true,
        },
        (redirectUrl: string) => {
          if (chrome.runtime.lastError || !redirectUrl) {
            reject(chrome.runtime.lastError || new Error('OAuth échoué'));
            return;
          }

          const params = new URLSearchParams(
            new URL(redirectUrl).hash.substring(1),
          );
          const accessToken = params.get('access_token');

          if (accessToken) {
            resolve(accessToken);
          } else {
            reject(new Error('Token non trouvé'));
          }
        },
      );
    });
  }

  private buildAuthUrl(): string {
    const clientID = this.clientId;
    let authURL = 'https://accounts.google.com/o/oauth2/auth';
    authURL += `?client_id=${clientID}`;
    authURL += `&response_type=token`;
    authURL += `&redirect_uri=${encodeURIComponent(this.redirectUri)}`;
    authURL += `&scope=${encodeURIComponent(this.scopes.join(' '))}`;

    return authURL;
  }
}
