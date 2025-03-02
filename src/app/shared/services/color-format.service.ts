import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorFormatService {
  private normalizedHex(hex: string): string {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      return hex
        .split('')
        .map((c) => c + c)
        .join('');
    } else if (hex.length !== 6) {
      throw new Error(`${hex} provided doesn't fit required format`);
    }
    return hex;
  }

  public hexToRgb(hex: string): {
    r: number;
    g: number;
    b: number;
    string: string;
  } {
    hex = this.normalizedHex(hex);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return { r, g, b, string: `rgb(${r}, ${g}, ${b})` };
  }

  public hexToHsl(hex: string): {
    h: number;
    s: number;
    l: number;
    string: string;
  } {
    let { r, g, b } = this.hexToRgb(hex);

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
    const hue = Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h);
    const sat = Math.round(
      100 * (s ? s / (1 - Math.abs(l + Math.min(r, g, b) - 1)) : 0),
    );
    const light = Math.round((100 * (2 * l - s)) / 2);

    return {
      h: hue,
      s: sat,
      l: light,
      string: `hsl(${hue}, ${sat}%, ${light}%)`,
    };
  }

  public hslToHex(h: number, s: number, l: number) {
    h = h % 360;
    s = Math.max(0, Math.min(100, s));
    l = Math.max(0, Math.min(100, l));

    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;

    if (h < 60) {
      r = c;
      g = x;
    } else if (h < 120) {
      r = x;
      g = c;
    } else if (h < 180) {
      g = c;
      b = x;
    } else if (h < 240) {
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      b = c;
    } else {
      r = c;
      b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    const toHex = (value: number) => {
      const hex = value.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  public rgbToHex({ r, g, b }: { r: number; g: number; b: number }): string {
    const toHex = (value: number) => {
      const hex = value.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
}
