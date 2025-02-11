import { inject, Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { lastValueFrom, Observable } from 'rxjs';
import { dbStore } from '../../constants/db.constants';
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
      this.dbService.getByIndex(dbStore, 'hex', color)
    );
    if (colorAlreadyInDb) {
      return await lastValueFrom(
        this.dbService.update(dbStore, {
          id: colorAlreadyInDb.id,
          hex: color,
          at: [new Date().getTime(), ...colorAlreadyInDb.at],
        })
      );
    } else {
      return await lastValueFrom(
        this.dbService.add(dbStore, {
          hex: color,
          at: [new Date().getTime()],
        })
      );
    }
  }

  /**
   * Returns all the saved colors.
   */
  public getAll(): Observable<ViewedColor[]> {
    return this.dbService.getAll(dbStore);
  }

  /**
   * Returns the last 10 colors saved by default or more if param count is specified.
   * @param count The number of results to return;
   */
  public async getLast(count: number = 10): Promise<ViewedColor[]> {
    const allColors = await lastValueFrom(this.getAll());
    // Since we add the newest date at the beginning of the number[] in the 'at' property,
    // we can use their first index ([0]) to get the newest value.
    const sortedColors = allColors.sort((a, b) => b.at[0] - a.at[0]);
    return sortedColors.slice(0, count);
  }

  /**
   * Delete the color related to this id and return all colors from db.
   * @param id The id of the color we want to delete from db.
   */
  public delete(id: number): Observable<ViewedColor[]> {
    return this.dbService.delete(dbStore, id);
  }
}
