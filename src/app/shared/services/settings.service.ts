import { Injectable, signal } from '@angular/core';
import { AUTO_COPY_CLIPBOARD_OFF } from '../../constants/localstorage.constant';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public autoCopyOff = signal(false);

  public getUserSettings(): void {
    this.autoCopyOff.set(
      JSON.parse(
        localStorage.getItem(AUTO_COPY_CLIPBOARD_OFF) ?? JSON.stringify(false),
      ),
    );
  }
}
