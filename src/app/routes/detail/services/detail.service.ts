import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HexDescribedDTO } from '../../../models/hex-described.dto';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public getColorDescription(hexColor: string): Observable<HexDescribedDTO> {
    return this.http.get<HexDescribedDTO>(
      `${this.apiUrl}/description/${hexColor}`,
    );
  }
}
