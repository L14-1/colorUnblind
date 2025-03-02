import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconEye } from 'angular-tabler-icons/icons';
import { ButtonModule } from 'primeng/button';
import { IColorDetail } from '../../../../interfaces/color-detail.interface';
import { ClipboardCopyDirective } from '../../../../shared/directives/clipboard-copy.directive';
import { ColorPaletteService } from '../../../../shared/services/color-palette.service';

@Component({
  selector: 'app-palette',
  imports: [
    ButtonModule,
    TablerIconComponent,
    RouterLink,
    ClipboardCopyDirective,
  ],
  providers: [provideTablerIcons({ IconEye })],
  templateUrl: './palette.component.html',
  styleUrl: './palette.component.scss',
})
export class PaletteComponent {
  public readonly complementary = input.required<IColorDetail>();
  public readonly analogous = input.required<IColorDetail[]>();
  public readonly triadic = input.required<IColorDetail[]>();
  public readonly tetradic = input.required<IColorDetail[]>();

  public readonly inputHex = input.required<string>();
  private readonly colorPaletteService = inject(ColorPaletteService);

  public readonly colors = computed<string[]>(() => {
    return this.colorPaletteService.generateColorPalette(this.inputHex(), [
      ...new Set(
        [...this.analogous(), ...this.triadic(), ...this.tetradic()].map(
          (color) => color.hex,
        ),
      ),
    ]);
  });
}
