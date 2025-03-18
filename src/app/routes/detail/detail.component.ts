import { Component, computed, inject, input, signal } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import {
  IconAi,
  IconClipboard,
  IconContrast2,
  IconLayersSelectedBottom,
  IconPalette,
} from 'angular-tabler-icons/icons';
import { AccordionModule } from 'primeng/accordion';

import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { PopoverModule } from 'primeng/popover';
import { ORIGINS } from '../../constants/origins.constant';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { ContrastedTextDirective } from '../../shared/directives/contrasted-text.directive';
import { ColorFormatService } from '../../shared/services/color-format.service';
import { ColorPaletteService } from '../../shared/services/color-palette.service';
import { InMemoryDescriptionsService } from '../../shared/services/in-memory-descriptions.service';
import { SettingsService } from '../../shared/services/settings.service';
import { AlternativesComponent } from './components/alternatives/alternatives.component';
import { ButtonsBannerComponent } from './components/buttons-banner/buttons-banner.component';
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
    ButtonsBannerComponent,
    ColorDetailComponent,
    ColorCodesComponent,
    AlternativesComponent,
    PaletteComponent,
    SkeletonComponent,
  ],
  providers: [
    provideTablerIcons({
      IconContrast2,
      IconClipboard,
      IconPalette,
      IconAi,
      IconLayersSelectedBottom,
    }),
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  public readonly rawHex = input('', { alias: 'hexvalue' });
  public readonly origin = input<ORIGINS>();
  private readonly messageService = inject(MessageService);
  private readonly settingsService = inject(SettingsService);
  private readonly inMemoryDescriptions = inject(InMemoryDescriptionsService);
  private readonly detailService = inject(DetailService);
  private readonly colorFormatService = inject(ColorFormatService);
  private readonly colorPaletteService = inject(ColorPaletteService);

  public description = signal('');
  public descriptionIsLoading = signal(false);
  public activeAccordions = signal(['0']);

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

  async ngOnChanges() {
    this.handleFirstOpenedAccordion();
    this.handleAutoCopy();
    await this.loadDescription();
  }

  private handleFirstOpenedAccordion() {
    if (
      this.origin() !== ORIGINS.PALETTE &&
      this.origin() !== ORIGINS.ALTERNATIVE
    ) {
      this.activeAccordions.set([this.settingsService.selectedMenu().position]);
    }
  }

  private handleAutoCopy() {
    if (this.settingsService.autoCopyOff()) return;
    if (this.origin() === ORIGINS.PICKER) {
      try {
        navigator.clipboard.writeText(`#${this.rawHex()}`);
        this.messageService.add({
          severity: 'success',
          summary: 'Copied to clipboard ! 🎉',
          detail: `'#${this.rawHex()}' was successfully copied to clipboard !`,
          closable: false,
        });
      } catch (e) {
        return;
      }
    }
  }

  private async loadDescription() {
    this.descriptionIsLoading.set(true);
    const existingDescription = await this.inMemoryDescriptions.get(
      this.rawHex(),
    );
    if (existingDescription) {
      this.description.set(existingDescription.description);
      this.descriptionIsLoading.set(false);
    } else {
      this.detailService.getColorDescription(this.rawHex()).subscribe({
        next: (data) => {
          if (data.isAiGenerated) {
            this.inMemoryDescriptions.save(this.rawHex(), data.description);
          }
          this.description.set(data.description);
          this.descriptionIsLoading.set(false);
        },
        error: (e: HttpErrorResponse) => {
          switch (e.status) {
            case HttpStatusCode.TooManyRequests:
              this.description.set('');
              this.messageService.add({
                severity: 'error',
                summary: 'Limit reached',
                detail: `You have reached your daily maximum request limit.`,
                closable: false,
              });
              break;
            case HttpStatusCode.InternalServerError:
              this.description.set('');
              this.messageService.add({
                severity: 'error',
                summary: 'Unexpected error',
                detail: `An error occurred while trying to describe this color. Please try again later.`,
                closable: false,
              });
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
}
