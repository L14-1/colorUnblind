import { inject, Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { lastValueFrom, Observable } from 'rxjs';
import { DB_STORE } from '../../constants/db.constants';
import { ViewedColor } from '../../models/viewed-color.model';

@Injectable({
  providedIn: 'root',
})
export class ViewedColorsService {
  private readonly dbService = inject(NgxIndexedDBService);

  /**
   * Save the picked color to the db and return the saved object.
   * @param color The hex value of the picked color;
   */
  public async save(color: string): Promise<ViewedColor> {
    const colorAlreadyInDb: ViewedColor | undefined = await lastValueFrom(
      this.dbService.getByIndex(DB_STORE, 'hex', color),
    );
    if (colorAlreadyInDb) {
      return await lastValueFrom(
        this.dbService.update(DB_STORE, {
          id: colorAlreadyInDb.id,
          hex: color,
          at: [new Date().getTime(), ...colorAlreadyInDb.at],
        }),
      );
    } else {
      return await lastValueFrom(
        this.dbService.add(DB_STORE, {
          hex: color,
          at: [new Date().getTime()],
        }),
      );
    }
  }

  /**
   * Returns all the saved colors.
   */
  public getAll(): Observable<ViewedColor[]> {
    return this.dbService?.getAll(DB_STORE) ?? [];
  }

  /**
   * Delete the color related to this id and return all colors from db.
   * @param id The id of the color we want to delete from db.
   */
  public delete(id: number): Observable<ViewedColor[]> {
    return this.dbService.delete(DB_STORE, id);
  }

  /**
   * Delete all colors from the db.
   */
  public deleteAll(colors: ViewedColor[]): Observable<number[]> {
    const keys = colors.map((color) => color.id ?? 0);
    return this.dbService.bulkDelete(DB_STORE, keys);
  }
}
