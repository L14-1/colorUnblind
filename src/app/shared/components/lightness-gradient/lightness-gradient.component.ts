import { Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'app-lightness-gradient',
  imports: [],
  templateUrl: './lightness-gradient.component.html',
  styleUrl: './lightness-gradient.component.scss',
})
export class LightnessGradientComponent {
  public readonly hsl = input.required<{
    h: number;
    s: number;
    l: number;
    string: string;
  }>();

  @HostBinding('style.background') get setBackgroundGradient() {
    return `linear-gradient(to right, ${this.getAllHslLightnessSteps(this.hsl().h, this.hsl().s)})`;
  }

  private getAllHslLightnessSteps(h: number, s: number): string {
    let res = '';
    for (let i = 0; i <= 100; i++) {
      res += `hsl(${this.hsl().h}, ${this.hsl().s}%, ${i}%)`;
      if (i !== 100) {
        res += ', ';
      }
    }
    return res;
  }
}
