import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { EyedropperService } from '../../shared/services/eyedropper.service';
import { ViewedColorsService } from '../../shared/services/viewed-colors.service';
import { CtaButtonComponent } from './components/cta-button/cta-button.component';
import { PreviouslyViewedColorsComponent } from './components/previously-viewed-colors/previously-viewed-colors.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    CtaButtonComponent,
    PreviouslyViewedColorsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly colorService = inject(ViewedColorsService);
  private readonly eyedropperService = inject(EyedropperService);
  private readonly router = inject(Router);

  public isViewing = signal(false);

  public async getColor(): Promise<void> {
    this.isViewing.set(true);
    try {
      let picked = await this.eyedropperService.openEyedropper();
      if (picked) {
        await this.colorService.save(picked);
        this.router.navigate(['detail', picked]);
      }
      this.isViewing.set(false);
    } catch {
      this.isViewing.set(false);
    }
  }
}
