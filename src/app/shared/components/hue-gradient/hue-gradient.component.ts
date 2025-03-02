import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-hue-gradient',
  imports: [],
  templateUrl: './hue-gradient.component.html',
  styleUrl: './hue-gradient.component.scss',
})
export class HueGradientComponent {
  public readonly hue = input.required<number>();
  public huePercentage = computed(() => {
    return `${this.hue() / 3.6}%`;
  });
}
