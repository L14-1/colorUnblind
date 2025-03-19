import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PREFERED_THEME } from './constants/localstorage.constant';
import { ColorThemeService } from './shared/services/color-theme.service';
import { Toast } from 'primeng/toast';
import { SettingsService } from './shared/services/settings.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly settingsService = inject(SettingsService);
  private readonly colorSchemeService = inject(ColorThemeService);

  ngOnInit(): void {
    this.settingsService.getUserSettings();
    const htmlEl = document.getElementsByTagName('html')[0];
    this.colorSchemeService.init(htmlEl);

    const preferedTheme = JSON.parse(
      localStorage.getItem(PREFERED_THEME) ?? JSON.stringify(''),
    );

    if (preferedTheme) {
      if (preferedTheme === 'Dark') {
        htmlEl.classList.add('colorunblind-dark');
      }
    } else if (this.colorSchemeService.userSystemSchemeIsDark()) {
      htmlEl.classList.add('colorunblind-dark');
    }
  }
}
