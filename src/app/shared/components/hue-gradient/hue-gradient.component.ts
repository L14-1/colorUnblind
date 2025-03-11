import { Component, computed, input, signal } from '@angular/core';

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

  public mainTickToShow = signal<number>(0);
  public asideTicks = signal<number[]>([]);

  public onMaskHover(mouse: MouseEvent) {
    const elWidth = (mouse.target as HTMLDivElement).clientWidth;
    const xPos = Math.abs((mouse.offsetX / elWidth) * 360);
    const closest = this.positions.reduce((prev: number, curr: number) =>
      Math.abs(curr - xPos) < Math.abs(prev - xPos) ? curr : prev,
    );
    this.mainTickToShow.set(closest);
    this.asideTicks.set([
      closest - 30 > -1 ? (closest - 30 < 361 ? closest - 30 : 360) : 0,
      closest + 30 > -1 ? (closest + 30 < 361 ? closest + 30 : 360) : 0,
    ]);
  }

  public colors = [
    {
      name: 'Red',
      position: 0,
    },
    {
      name: 'Orange',
      position: 30,
    },
    {
      name: 'Yellow',
      position: 60,
    },
    {
      name: 'Lime',
      position: 90,
    },
    {
      name: 'Green',
      position: 120,
    },
    {
      name: 'Turquoise',
      position: 150,
    },
    {
      name: 'Cyan',
      position: 180,
    },
    {
      name: 'Cobalt',
      position: 210,
    },
    {
      name: 'Blue',
      position: 240,
    },
    {
      name: 'Violet',
      position: 270,
    },
    {
      name: 'Magenta',
      position: 300,
    },
    {
      name: 'Crimson',
      position: 330,
    },
    {
      name: 'Red',
      position: 360,
    },
  ];

  private readonly positions = this.colors.map((color) => color.position);
}
