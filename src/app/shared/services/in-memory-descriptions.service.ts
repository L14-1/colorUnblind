import { inject, Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { lastValueFrom } from 'rxjs';
import { DB_DESCRIPTION_STORE } from '../../constants/db.constants';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDescriptionsService {
  private readonly dbService = inject(NgxIndexedDBService);

  public async save(hex: string, description: string): Promise<void> {
    const colorAlreadyInDb = await this.get(hex);

    if (!colorAlreadyInDb) {
      await lastValueFrom(
        this.dbService.add(DB_DESCRIPTION_STORE, {
          hex,
          description,
        }),
      );
    }
  }

  public async get(hex: string): Promise<any> {
    return await lastValueFrom(
      this.dbService.getByIndex(DB_DESCRIPTION_STORE, 'hex', hex),
    );
  }
}
