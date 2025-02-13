import { Component, computed, input } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconCopy } from 'angular-tabler-icons/icons';
import nearestColor from 'nearest-color';
import { ButtonModule } from 'primeng/button';
import { availableHexs } from '../../constants/descriptions.constant';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-detail',
  imports: [HeaderComponent, ButtonModule, TablerIconComponent],
  providers: [provideTablerIcons({ IconCopy })],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  public readonly rawHex = input('', { alias: 'hexvalue' });

  public hex = computed(() => {
    let hex = this.rawHex().replace('#', '');
    if (hex.length === 3) {
      return hex
        .split('')
        .map((c) => c + c)
        .join('');
    } else if (hex.length !== 6) {
      return null;
    }
    return hex;
  });

  private readonly rgbObj = computed(() => {
    const hex = this.hex();

    if (!hex) return null;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return { r, g, b };
  });

  public description = computed(() => {
    const nearestHex = nearestColor.from(availableHexs);
    const foundColor = nearestHex(this.hex() ?? '');
    return foundColor?.name ?? '';
  });

  public rgb = computed(() => {
    const rgbObj = this.rgbObj();

    if (!rgbObj) return '';
    return `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`;
  });

  public hsl = computed(() => {
    const rgbObj = this.rgbObj();

    if (!rgbObj) return '';
    let { r, g, b } = rgbObj;

    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
          ? 2 + (b - r) / s
          : 4 + (r - g) / s
      : 0;

    return `hsl(${Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h)}, ${Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0))}%, ${Math.round((100 * (2 * l - s)) / 2)}%)`;
  });

  public copyToClipboard(toCopy: string) {
    navigator.clipboard.writeText(toCopy);
  }
}
