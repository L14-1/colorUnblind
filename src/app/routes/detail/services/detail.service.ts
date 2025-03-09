import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public getColorDescription(hexColor: string) {
    return this.http.get<{ description: string }>(
      `${this.apiUrl}/description/${hexColor}`,
    );
  }
}
