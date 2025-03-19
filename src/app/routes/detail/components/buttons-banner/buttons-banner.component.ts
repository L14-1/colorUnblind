import { Component, inject, input, signal } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import {
  IconHeartFilled,
  IconHeartOff,
  IconHeartPlus,
} from 'angular-tabler-icons/icons';
import { FavoritesService } from '../../../../shared/services/favorites.service';

@Component({
  selector: 'app-buttons-banner',
  imports: [TablerIconComponent],
  providers: [
    provideTablerIcons({ IconHeartPlus, IconHeartFilled, IconHeartOff }),
  ],
  templateUrl: './buttons-banner.component.html',
  styleUrl: './buttons-banner.component.scss',
})
export class ButtonsBannerComponent {
  public hex = input.required<string>();
  public isFavorite = signal(false);

  private readonly favoritesService = inject(FavoritesService);

  ngOnChanges(): void {
    if (!this.hex()) return;
    this.setStatusOfColor(this.hex());
  }

  public async toggleFavorite(hex: string) {
    if (this.isFavorite()) {
      await this.favoritesService.remove(hex);
    } else {
      await this.favoritesService.save(hex);
    }
    this.setStatusOfColor(hex);
  }

  private async setStatusOfColor(hex: string) {
    this.isFavorite.set(!!(await this.favoritesService.get(hex)));
  }
}
