import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { TablerIconComponent } from 'angular-tabler-icons';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { PreviouslyViewedColorsComponent } from '../../shared/components/previously-viewed-colors/previously-viewed-colors.component';
import { ViewedColorsService } from '../../shared/services/viewed-colors.service';

@Component({
  selector: 'app-stats',
  imports: [
    HeaderComponent,
    PreviouslyViewedColorsComponent,
    ButtonModule,
    TablerIconComponent,
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent {
  private readonly colorsService = inject(ViewedColorsService);

  public allViewedColors = toSignal(this.colorsService.getAll());
}
