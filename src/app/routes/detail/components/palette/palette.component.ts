import { Component, computed, input } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconEye } from 'angular-tabler-icons/icons';
import { ButtonModule } from 'primeng/button';
import { IColorDetail } from '../../../../interfaces/color-detail.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-palette',
  imports: [ButtonModule, TablerIconComponent, RouterLink],
  providers: [provideTablerIcons({ IconEye })],
  templateUrl: './palette.component.html',
  styleUrl: './palette.component.scss',
})
export class PaletteComponent {
  public readonly complementary = input.required<IColorDetail>();
  public readonly analogous = input.required<IColorDetail[]>();
  public readonly triadic = input.required<IColorDetail[]>();
  public readonly tetradic = input.required<IColorDetail[]>();

  public readonly colors = computed<IColorDetail[]>(() => {
    return [
      ...new Set([...this.analogous(), ...this.triadic(), ...this.tetradic()]),
    ];
  });
}
