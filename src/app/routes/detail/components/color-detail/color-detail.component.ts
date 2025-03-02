import { Component, input } from '@angular/core';
import { HueGradientComponent } from '../../../../shared/components/hue-gradient/hue-gradient.component';
import { LightnessGradientComponent } from '../../../../shared/components/lightness-gradient/lightness-gradient.component';
import { SaturationGradientComponent } from '../../../../shared/components/saturation-gradient/saturation-gradient.component';

@Component({
  selector: 'app-color-detail',
  imports: [
    HueGradientComponent,
    SaturationGradientComponent,
    LightnessGradientComponent,
  ],
  templateUrl: './color-detail.component.html',
  styleUrl: './color-detail.component.scss',
})
export class ColorDetailComponent {
  public readonly hsl = input.required<{
    h: number;
    s: number;
    l: number;
    string: string;
  }>();
}
