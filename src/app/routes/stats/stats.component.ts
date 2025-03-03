import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconInfoCircle } from 'angular-tabler-icons/icons';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { PreviouslyViewedColorsComponent } from '../../shared/components/previously-viewed-colors/previously-viewed-colors.component';
import { ViewedColorsService } from '../../shared/services/viewed-colors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  imports: [
    HeaderComponent,
    PreviouslyViewedColorsComponent,
    ButtonModule,
    TablerIconComponent,
    ConfirmDialogModule,
  ],
  providers: [provideTablerIcons({ IconInfoCircle }), ConfirmationService],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent {
  private readonly colorsService = inject(ViewedColorsService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly viewedColorsService = inject(ViewedColorsService);
  private readonly router = inject(Router);

  public allViewedColors = toSignal(this.colorsService.getAll());

  public confirmDeletion(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete all saved colors ?',
      header: 'Delete history',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.viewedColorsService
          .deleteAll(this.allViewedColors() ?? [])
          .subscribe((deleted) => {
            if (deleted) {
              this.router.navigate(['/']);
            }
          });
      },
      closable: false,
      key: 'confirmDialog',
    });
  }
}
