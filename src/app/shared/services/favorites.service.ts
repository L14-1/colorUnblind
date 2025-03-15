import { inject, Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { lastValueFrom, Observable } from 'rxjs';
import { DB_FAVORITES_STORE } from '../../constants/db.constants';
import { FavoriteColor } from '../../models/favorite-color.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly dbService = inject(NgxIndexedDBService);

  public async save(hex: string): Promise<void> {
    const colorAlreadyInDb = await this.get(hex);

    if (!colorAlreadyInDb) {
      await lastValueFrom(
        this.dbService.add(DB_FAVORITES_STORE, {
          hex,
        }),
      );
    }
  }

  public async remove(hex: string): Promise<void> {
    const colorAlreadyInDb = await this.get(hex);

    if (colorAlreadyInDb?.id) {
      await lastValueFrom(
        this.dbService.delete(DB_FAVORITES_STORE, colorAlreadyInDb.id),
      );
    }
  }

  public async get(hex: string): Promise<FavoriteColor | undefined> {
    const found = await lastValueFrom(
      this.dbService.getByIndex<FavoriteColor | undefined>(
        DB_FAVORITES_STORE,
        'hex',
        hex,
      ),
    );
    return found;
  }

  public getAll(): Observable<FavoriteColor[]> {
    return this.dbService.getAll(DB_FAVORITES_STORE);
  }
}
