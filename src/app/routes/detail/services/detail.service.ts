import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HexAlternativeDTO } from '../../../models/hex-alternative.model';
import { HexDescribedDTO } from '../../../models/hex-described.dto';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public getColorDescription(
    hexColor: string,
    proDescription: boolean,
  ): Observable<HexDescribedDTO> {
    return this.http.post<HexDescribedDTO>(`${this.apiUrl}/description/`, {
      hexColor,
      proDescription,
    });
  }

  public getColorAlternatives(
    hexColor: string,
  ): Observable<HexAlternativeDTO[]> {
    return this.http.get<HexAlternativeDTO[]>(
      `${this.apiUrl}/alternatives/${hexColor}`,
    );
  }
}
