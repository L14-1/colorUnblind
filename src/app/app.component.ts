import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PREFERED_THEME } from './constants/localstorage.constant';
import { ColorThemeService } from './shared/services/color-theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly colorSchemeService = inject(ColorThemeService);

  ngOnInit(): void {
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
