import { Injectable, signal } from '@angular/core';
import { PREFERED_THEME } from '../../constants/localstorage.constant';

@Injectable({
  providedIn: 'root',
})
export class ColorThemeService {
  public userSystemSchemeIsDark = signal(false);

  public init(htmlEl: HTMLElement): void {
    this.userSystemSchemeIsDark.set(
      window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches,
    );

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        this.userSystemSchemeIsDark.set(event.matches);
        if (
          !JSON.parse(
            localStorage.getItem(PREFERED_THEME) ?? JSON.stringify(''),
          )
        ) {
          event.matches
            ? htmlEl.classList.add('colorunblind-dark')
            : htmlEl.classList.remove('colorunblind-dark');
        }
      });
  }
}
