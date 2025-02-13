import { computed, inject, Injectable, signal } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { lastValueFrom, Observable } from 'rxjs';
import { dbStore } from '../../constants/db.constants';
import { ViewedColor } from '../../models/viewed-color.model';
import { toSignal } from '@angular/core/rxjs-interop';

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
      this.dbService.getByIndex(dbStore, 'hex', color),
    );
    if (colorAlreadyInDb) {
      return await lastValueFrom(
        this.dbService.update(dbStore, {
          id: colorAlreadyInDb.id,
          hex: color,
          at: [new Date().getTime(), ...colorAlreadyInDb.at],
        }),
      );
    } else {
      return await lastValueFrom(
        this.dbService.add(dbStore, {
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
    return this.dbService?.getAll(dbStore) ?? [];
  }

  /**
   * Delete the color related to this id and return all colors from db.
   * @param id The id of the color we want to delete from db.
   */
  public delete(id: number): Observable<ViewedColor[]> {
    return this.dbService.delete(dbStore, id);
  }
}
