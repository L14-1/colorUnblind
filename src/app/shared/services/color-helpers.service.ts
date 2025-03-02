import { inject, Injectable } from '@angular/core';
import { ColorFormatService } from './color-format.service';

@Injectable({
  providedIn: 'root',
})
export class ColorHelpersService {
  private readonly colorFormatService = inject(ColorFormatService);

  public getRelativeLuminance({
    r,
    g,
    b,
  }: {
    r: number;
    g: number;
    b: number;
  }): number {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c /= 255.0;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  public getContrastRatio(lum1: number, lum2: number): number {
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  public colorDifference(
    color1: { r: number; g: number; b: number },
    color2: { r: number; g: number; b: number },
  ): number {
    return Math.sqrt(
      Math.pow(color1.r - color2.r, 2) +
        Math.pow(color1.g - color2.g, 2) +
        Math.pow(color1.b - color2.b, 2),
    );
  }

  public adjustLightness(
    { r, g, b }: { r: number; g: number; b: number },
    amount: number,
  ): { r: number; g: number; b: number } {
    const adjust = (value: number) => {
      return Math.min(255, Math.max(0, value + value * amount));
    };
    return {
      r: adjust(r),
      g: adjust(g),
      b: adjust(b),
    };
  }

  public findMaxContrastColor = (
    colors: string[],
    luminance: number,
  ): string => {
    let maxContrastColor = '';
    let maxContrastRatio = 0;

    colors.forEach((color) => {
      const colorRgb = this.colorFormatService.hexToRgb(color);
      const colorLuminance = this.getRelativeLuminance(colorRgb);
      const contrastRatio = this.getContrastRatio(luminance, colorLuminance);

      if (contrastRatio > maxContrastRatio) {
        maxContrastRatio = contrastRatio;
        maxContrastColor = color;
      }
    });

    return maxContrastColor;
  };

  public findClosestHSL(
    inputHSL: { h: number; s: number; l: number },
    hexArray: string[],
  ) {
    let closestHex = null;
    let minDistance = Infinity;

    for (let currentHex of hexArray) {
      const distance = this.hslDistance(inputHSL, this.colorFormatService.hexToHsl(currentHex));

      if (distance < minDistance) {
        minDistance = distance;
        closestHex = currentHex;
      }
    }

    return closestHex;
  }

  private hslDistance(hsl1: { h: number; s: number; l: number }, hsl2: { h: number; s: number; l: number }) {
    const h1 = hsl1.h;
    const s1 = hsl1.s;
    const l1 = hsl1.l;

    const h2 = hsl2.h;
    const s2 = hsl2.s;
    const l2 = hsl2.l;

    const hDiff = Math.min(Math.abs(h1 - h2), 360 - Math.abs(h1 - h2));
    const sDiff = Math.abs(s1 - s2);
    const lDiff = Math.abs(l1 - l2);
    return hDiff + sDiff + lDiff;
}
}
