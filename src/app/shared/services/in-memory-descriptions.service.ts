import { inject, Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { lastValueFrom, Observable } from 'rxjs';
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

  public async get(
    hex: string,
  ): Promise<{ id: number; hex: string; description: string }> {
    return await lastValueFrom(
      this.dbService.getByIndex(DB_DESCRIPTION_STORE, 'hex', hex),
    );
  }

  public async remove(hex: string): Promise<void> {
    const colorAlreadyInDb = await this.get(hex);

    if (colorAlreadyInDb?.id) {
      await lastValueFrom(
        this.dbService.delete(DB_DESCRIPTION_STORE, colorAlreadyInDb.id),
      );
    }
  }

  public getAll(): Observable<
    { id: number; hex: string; description: string }[]
  > {
    return this.dbService.getAll(DB_DESCRIPTION_STORE);
  }
}
