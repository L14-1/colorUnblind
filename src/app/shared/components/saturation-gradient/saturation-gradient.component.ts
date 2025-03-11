import { Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'app-saturation-gradient',
  imports: [],
  templateUrl: './saturation-gradient.component.html',
  styleUrl: '../lightness-gradient/lightness-gradient.component.scss',
})
export class SaturationGradientComponent {
  public readonly hsl = input.required<{
    h: number;
    s: number;
    l: number;
    string: string;
  }>();

  @HostBinding('style.background') get setBackgroundGradient() {
    return `linear-gradient(to right, ${this.getAllHslSaturationSteps(this.hsl().h, this.hsl().s)})`;
  }

  private getAllHslSaturationSteps(h: number, s: number): string {
    let res = '';
    for (let i = 0; i <= 100; i++) {
      res += `hsl(${this.hsl().h}, ${i}%, ${this.hsl().l}%)`;
      if (i !== 100) {
        res += ', ';
      }
    }
    return res;
  }
}
