import { Component, computed, inject, input, signal } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import {
  IconClipboard,
  IconContrast2,
  IconPalette,
} from 'angular-tabler-icons/icons';
import { AccordionModule } from 'primeng/accordion';

import { hexDetailed, hexList } from '../../constants/descriptions.constant';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ContrastedTextDirective } from '../../shared/directives/contrasted-text.directive';
import { ColorFormatService } from '../../shared/services/color-format.service';
import { ColorHelpersService } from '../../shared/services/color-helpers.service';
import { ColorPaletteService } from '../../shared/services/color-palette.service';
import { ColorCodesComponent } from './components/color-codes/color-codes.component';
import { ColorDetailComponent } from './components/color-detail/color-detail.component';
import { PaletteComponent } from './components/palette/palette.component';

@Component({
  selector: 'app-detail',
  imports: [
    HeaderComponent,
    ContrastedTextDirective,
    AccordionModule,
    TablerIconComponent,
    ColorDetailComponent,
    ColorCodesComponent,
    PaletteComponent,
  ],
  providers: [
    provideTablerIcons({ IconContrast2, IconClipboard, IconPalette }),
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  public readonly rawHex = input('', { alias: 'hexvalue' });
  private readonly colorFormatService = inject(ColorFormatService);
  private readonly colorPaletteService = inject(ColorPaletteService);
  private readonly colorHelperService = inject(ColorHelpersService);

  public activeAccordion = signal('0');

  public description = computed(() => {
    const closest = this.colorHelperService.findClosestHSL(this.hsl(), hexList);
    return closest ? hexDetailed[closest] : '';
  });

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
    this.activeAccordion.set('0');
  }
}
