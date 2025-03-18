import { Injectable, signal } from '@angular/core';
import {
  AUTO_COPY_CLIPBOARD_OFF,
  DEFAULT_MENU,
} from '../../constants/localstorage.constant';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public autoCopyOff = signal(false);
  public selectedMenu = signal({ name: 'Codes', position: '1' });

  public getUserSettings(): void {
    this.autoCopyOff.set(
      JSON.parse(
        localStorage.getItem(AUTO_COPY_CLIPBOARD_OFF) ?? JSON.stringify(false),
      ),
    );
    const storedDefaultMenu = localStorage.getItem(DEFAULT_MENU);
    if (storedDefaultMenu) {
      const parsedStoredMenu = JSON.parse(storedDefaultMenu);
      parsedStoredMenu.position = Math.round(
        parsedStoredMenu.position,
      ).toString();
      if (parsedStoredMenu.position > -1 && parsedStoredMenu.position < 4) {
        this.selectedMenu.set(parsedStoredMenu);
      }
    }
  }

  public setNewSelectedMenu(): void {
    localStorage.setItem(DEFAULT_MENU, JSON.stringify(this.selectedMenu()));
  }
}
