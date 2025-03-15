import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorComponent } from '../../shared/components/color/color.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FavoritesService } from '../../shared/services/favorites.service';

@Component({
  selector: 'app-favorites',
  imports: [HeaderComponent, ColorComponent, ButtonModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  private readonly favoritesService = inject(FavoritesService);
  private readonly confirmationService = inject(ConfirmationService);

  public favorites = toSignal(this.favoritesService.getAll());

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
        // this.viewedColorsService
        //   .deleteAll(this.allViewedColors() ?? [])
        //   .subscribe((deleted) => {
        //     if (deleted) {
        //       this.router.navigate(['/']);
        //     }
        //   });
      },
      closable: false,
      key: 'confirmDialog',
    });
  }
}
