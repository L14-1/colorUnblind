import { inject, Injectable, signal } from '@angular/core';
import {
  AUTO_COPY_CLIPBOARD_OFF,
  DEFAULT_MENU,
  PRO_DESCRIPTION_ON,
} from '../../constants/localstorage.constant';
import { AuthService } from '../../routes/auth/auth.service';
import { InMemoryDescriptionsService } from './in-memory-descriptions.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly inMemoryDescription = inject(InMemoryDescriptionsService);
  private readonly authService = inject(AuthService);
  public autoCopyOff = signal(false);
  public proDescription = signal(false);
  public selectedMenu = signal({ name: 'Codes', position: '1' });

  public getUserSettings(): void {
    this.autoCopyOff.set(
      !!JSON.parse(
        localStorage.getItem(AUTO_COPY_CLIPBOARD_OFF) ?? JSON.stringify(false),
      ),
    );
    this.proDescription.set(
      !!JSON.parse(
        localStorage.getItem(PRO_DESCRIPTION_ON) ?? JSON.stringify(false),
      ),
    );
    const storedDefaultMenu = localStorage.getItem(DEFAULT_MENU);
    if (storedDefaultMenu && this.authService.loggedIn()) {
      const parsedStoredMenu = JSON.parse(storedDefaultMenu);
      parsedStoredMenu.position = Math.round(
        parsedStoredMenu.position,
      ).toString();
      if (parsedStoredMenu.position > -1 && parsedStoredMenu.position < 4) {
        this.selectedMenu.set(parsedStoredMenu);
      }
    } else {
      this.selectedMenu.set({ name: 'Codes', position: '1' });
    }
  }

  public setNewSelectedMenu(): void {
    localStorage.setItem(DEFAULT_MENU, JSON.stringify(this.selectedMenu()));
  }

  public setProDescription(): void {
    this.inMemoryDescription.getAll().subscribe({
      next: (inMemoryDescriptions) => {
        for (let inMemoryDescription of inMemoryDescriptions) {
          this.inMemoryDescription.remove(inMemoryDescription.hex);
        }
        localStorage.setItem(
          PRO_DESCRIPTION_ON,
          JSON.stringify(this.proDescription()),
        );
      },
    });
  }
}
