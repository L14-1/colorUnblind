import { Component, computed, inject, input, signal } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import {
  IconAi,
  IconAlertSquareRounded,
  IconClipboard,
  IconContrast2,
  IconLayersSelectedBottom,
  IconPalette,
} from 'angular-tabler-icons/icons';
import { AccordionModule } from 'primeng/accordion';

import { Clipboard } from '@angular/cdk/clipboard';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';
import { PopoverModule } from 'primeng/popover';
import { ORIGINS } from '../../constants/origins.constant';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { ContrastedTextDirective } from '../../shared/directives/contrasted-text.directive';
import { ColorFormatService } from '../../shared/services/color-format.service';
import { ColorPaletteService } from '../../shared/services/color-palette.service';
import { InMemoryDescriptionsService } from '../../shared/services/in-memory-descriptions.service';
import { SettingsService } from '../../shared/services/settings.service';
import { AuthService } from '../auth/auth.service';
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
    Message,
    RouterLink,
  ],
  providers: [
    provideTablerIcons({
      IconContrast2,
      IconClipboard,
      IconPalette,
      IconAi,
      IconLayersSelectedBottom,
      IconAlertSquareRounded,
    }),
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  public readonly rawHex = input('', { alias: 'hexvalue' });
  public readonly origin = input<ORIGINS>();
  public readonly isLoggedIn = inject(AuthService).loggedIn;
  public readonly isPro = inject(AuthService).isPro;
  private readonly messageService = inject(MessageService);
  private readonly settingsService = inject(SettingsService);
  private readonly inMemoryDescriptions = inject(InMemoryDescriptionsService);
  private readonly detailService = inject(DetailService);
  private readonly colorFormatService = inject(ColorFormatService);
  private readonly colorPaletteService = inject(ColorPaletteService);
  private readonly clipboard = inject(Clipboard);

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
        let copied = this.clipboard.copy(`#${this.rawHex()}`);
        if (copied) {
          this.messageService.add({
            severity: 'success',
            summary: 'Copied ! 🎉',
            detail: `'#${this.rawHex()}' copied to clipboard !`,
            closable: false,
          });
        }
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
      this.detailService
        .getColorDescription(
          this.rawHex(),
          this.settingsService.proDescription(),
        )
        .subscribe({
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
              default:
                this.description.set('');
                this.messageService.add({
                  severity: 'error',
                  summary: 'Unexpected error',
                  detail: `An error occurred while trying to describe this color. Please try again later.`,
                  closable: false,
                });
            }
            this.descriptionIsLoading.set(false);
          },
        });
    }
  }
}
