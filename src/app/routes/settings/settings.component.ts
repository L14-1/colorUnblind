import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import {
  IconClipboard,
  IconInfoSquareRounded,
  IconSunMoon,
} from 'angular-tabler-icons/icons';
import { ButtonDirective } from 'primeng/button';
import { Select } from 'primeng/select';
import { ToggleSwitch } from 'primeng/toggleswitch';
import {
  AUTO_COPY_CLIPBOARD_OFF,
  PREFERED_THEME,
} from '../../constants/localstorage.constant';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ColorThemeService } from '../../shared/services/color-theme.service';
import { SettingsService } from '../../shared/services/settings.service';

@Component({
  selector: 'app-settings',
  imports: [
    HeaderComponent,
    TablerIconComponent,
    FormsModule,
    Select,
    ToggleSwitch,
    ButtonDirective,
    RouterLink,
  ],
  providers: [
    provideTablerIcons({ IconSunMoon, IconInfoSquareRounded, IconClipboard }),
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private readonly settingsService = inject(SettingsService);
  private readonly colorSchemeService = inject(ColorThemeService);

  public selectedTheme = signal({ name: 'System' });
  public autoCopyOff = this.settingsService.autoCopyOff;

  public autoCopy = computed(() => {
    return !this.autoCopyOff();
  });

  public themes = signal([
    { name: 'System' },
    { name: 'Light' },
    { name: 'Dark' },
  ]);

  ngOnInit(): void {
    const theme = JSON.parse(
      localStorage.getItem(PREFERED_THEME) ?? JSON.stringify(''),
    );

    if (theme) {
      this.selectedTheme.set({ name: theme });
    }
  }

  public changeTheme() {
    if (this.selectedTheme().name === 'Dark') {
      localStorage.setItem(PREFERED_THEME, JSON.stringify('Dark'));
      document
        .getElementsByTagName('html')[0]
        .classList.add('colorunblind-dark');
    } else if (this.selectedTheme().name === 'Light') {
      localStorage.setItem(PREFERED_THEME, JSON.stringify('Light'));
      document
        .getElementsByTagName('html')[0]
        .classList.remove('colorunblind-dark');
    } else {
      localStorage.removeItem(PREFERED_THEME);
      if (this.colorSchemeService.userSystemSchemeIsDark()) {
        document
          .getElementsByTagName('html')[0]
          .classList.add('colorunblind-dark');
      } else {
        document
          .getElementsByTagName('html')[0]
          .classList.remove('colorunblind-dark');
      }
    }
  }

  public toggleAutoCopy() {
    this.autoCopyOff.set(this.autoCopy());
    localStorage.setItem(
      AUTO_COPY_CLIPBOARD_OFF,
      JSON.stringify(this.autoCopyOff()),
    );
  }
}
