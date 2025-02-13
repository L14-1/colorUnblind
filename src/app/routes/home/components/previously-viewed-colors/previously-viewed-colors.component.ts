import { Component, computed, inject } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconEye } from 'angular-tabler-icons/icons';
import { ViewedColorsService } from '../../../../shared/services/viewed-colors.service';

@Component({
  selector: 'app-previously-viewed-colors',
  imports: [RouterLink, TablerIconComponent],
  providers: [provideTablerIcons({ IconEye })],
  templateUrl: './previously-viewed-colors.component.html',
  styleUrl: './previously-viewed-colors.component.scss',
})
export class PreviouslyViewedColorsComponent {
  private readonly colorService = inject(ViewedColorsService);

  private readonly viewedColors = toSignal(this.colorService.getAll());

  public lastColors = computed(() => {
    const sortedColors = this.viewedColors()?.sort((a, b) => b.at[0] - a.at[0]);
    return sortedColors?.slice(0, 10);
  });
}
