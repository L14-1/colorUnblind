import { Component, computed, inject, input, signal } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import {
  IconAi,
  IconClipboard,
  IconContrast2,
  IconPalette,
} from 'angular-tabler-icons/icons';
import { AccordionModule } from 'primeng/accordion';

import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { PopoverModule } from 'primeng/popover';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { ContrastedTextDirective } from '../../shared/directives/contrasted-text.directive';
import { ColorFormatService } from '../../shared/services/color-format.service';
import { ColorPaletteService } from '../../shared/services/color-palette.service';
import { ColorCodesComponent } from './components/color-codes/color-codes.component';
import { ColorDetailComponent } from './components/color-detail/color-detail.component';
import { PaletteComponent } from './components/palette/palette.component';
import { DetailService } from './services/detail.service';

@Component({
  selector: 'app-detail',
  imports: [
    HeaderComponent,
    ContrastedTextDirective,
    PopoverModule,
    AccordionModule,
    TablerIconComponent,
    ColorDetailComponent,
    ColorCodesComponent,
    PaletteComponent,
    SkeletonComponent,
  ],
  providers: [
    provideTablerIcons({ IconContrast2, IconClipboard, IconPalette, IconAi }),
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  public readonly rawHex = input('', { alias: 'hexvalue' });
  private readonly detailService = inject(DetailService);
  private readonly colorFormatService = inject(ColorFormatService);
  private readonly colorPaletteService = inject(ColorPaletteService);

  public description = signal('');
  public descriptionIsLoading = signal(false);
  public activeAccordion = signal('0');

  public complementary = computed(() => {
    const { h, s, l } = this.colorFormatService.hexToHsl(this.rawHex());
    return this.colorPaletteService.getComplementaryColor(h, s, l);
  });

  public analogous = computed(() => {
    const { h, s, l } = this.colorFormatService.hexToHsl(this.rawHex());
    return this.colorPaletteService.getAnalogousColors(h, s, l);
  });

  public triadic = computed(() => {
    const { h, s, l } = this.colorFormatService.hexToHsl(this.rawHex());
    return this.colorPaletteService.getTriadicColors(h, s, l);
  });

  public tetradic = computed(() => {
    const { h, s, l } = this.colorFormatService.hexToHsl(this.rawHex());
    return this.colorPaletteService.getTetradicColors(h, s, l);
  });

  public rgb = computed(() => {
    return this.colorFormatService.hexToRgb(this.rawHex()).string;
  });

  public hsl = computed(() => {
    return this.colorFormatService.hexToHsl(this.rawHex());
  });

  ngOnChanges(): void {
    this.descriptionIsLoading.set(true);
    this.activeAccordion.set('0');
    this.detailService.getColorDescription(this.rawHex()).subscribe({
      next: (data) => {
        this.description.set(data.description);
        this.descriptionIsLoading.set(false);
      },
      error: (e: HttpErrorResponse) => {
        switch (e.status) {
          case HttpStatusCode.TooManyRequests:
            this.description.set(
              'You have reached your daily maximum request limit.',
            );
            break;

          case HttpStatusCode.InternalServerError:
            this.description.set(
              'An error occurred while trying to describe this color. Please try again later.',
            );
            break;

          default:
            this.description.set(
              'An unexpected error occurred. Please try again.',
            );
        }
        this.descriptionIsLoading.set(false);
      },
    });
  }
}
