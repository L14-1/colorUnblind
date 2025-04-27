import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HexAlternativeDTO } from '../../../models/hex-alternative.model';
import { HexDescribedDTO } from '../../../models/hex-described.dto';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  private readonly authService = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public getColorDescription(
    hexColor: string,
    proDescription: boolean,
  ): Observable<HexDescribedDTO> {
    if (!this.authService.loggedIn()) {
      return of({
        isAiGenerated: false,
        description: '',
      });
    }
    return this.http.post<HexDescribedDTO>(`${this.apiUrl}/description/`, {
      hexColor,
      proDescription,
    });
  }

  public getColorAlternatives(
    hexColor: string,
  ): Observable<HexAlternativeDTO[]> {
    if (!this.authService.loggedIn()) {
      return of([]);
    }
    return this.http.get<HexAlternativeDTO[]>(
      `${this.apiUrl}/alternatives/${hexColor}`,
    );
  }
}
