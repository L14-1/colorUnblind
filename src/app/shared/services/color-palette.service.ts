import { inject, Injectable } from '@angular/core';
import { IColorDetail } from '../../interfaces/color-detail.interface';
import { ColorFormatService } from './color-format.service';
import { ColorHelpersService } from './color-helpers.service';

@Injectable({
  providedIn: 'root',
})
export class ColorPaletteService {
  private readonly colorFormatService = inject(ColorFormatService);
  private readonly colorHelpersService = inject(ColorHelpersService);

  public getComplementaryColor(h: number, s: number, l: number): IColorDetail {
    const complementaryHue = (h + 180) % 360;
    return {
      hsl: `hsl(${complementaryHue}, ${s}%, ${l}%)`,
      hex: this.colorFormatService.hslToHex(complementaryHue, s, l),
    };
  }

  public getAnalogousColors(h: number, s: number, l: number): IColorDetail[] {
    const analogousHue1 = (h + 30) % 360;
    const analogousHue2 = (h - 30) % 360;
    return [
      {
        hsl: `hsl(${analogousHue1}, ${s}%, ${l}%)`,
        hex: this.colorFormatService.hslToHex(analogousHue1, s, l),
      },
      {
        hsl: `hsl(${analogousHue2}, ${s}%, ${l}%)`,
        hex: this.colorFormatService.hslToHex(analogousHue2, s, l),
      },
    ];
  }

  public getTriadicColors(h: number, s: number, l: number): IColorDetail[] {
    const triadicHue1 = (h + 120) % 360;
    const triadicHue2 = (h + 240) % 360;
    return [
      {
        hsl: `hsl(${triadicHue1}, ${s}%, ${l}%)`,
        hex: this.colorFormatService.hslToHex(triadicHue1, s, l),
      },
      {
        hsl: `hsl(${triadicHue2}, ${s}%, ${l}%)`,
        hex: this.colorFormatService.hslToHex(triadicHue2, s, l),
      },
    ];
  }

  public getTetradicColors(h: number, s: number, l: number): IColorDetail[] {
    const tetradicHue1 = (h + 90) % 360;
    const tetradicHue2 = (h + 180) % 360;
    const tetradicHue3 = (h + 270) % 360;
    return [
      {
        hsl: `hsl(${tetradicHue1}, ${s}%, ${l}%)`,
        hex: this.colorFormatService.hslToHex(tetradicHue1, s, l),
      },
      {
        hsl: `hsl(${tetradicHue2}, ${s}%, ${l}%)`,
        hex: this.colorFormatService.hslToHex(tetradicHue2, s, l),
      },
      {
        hsl: `hsl(${tetradicHue3}, ${s}%, ${l}%)`,
        hex: this.colorFormatService.hslToHex(tetradicHue3, s, l),
      },
    ];
  }

  public generateColorPalette(
    inputColor: string,
    colorArray: string[],
  ): string[] {
    if (colorArray.length < 3) return colorArray;
    const inputRgb = this.colorFormatService.hexToRgb(inputColor);
    const palette: string[] = [];

    const sortedColors = colorArray.sort((a, b) => {
      const colorA = this.colorFormatService.hexToRgb(a);
      const colorB = this.colorFormatService.hexToRgb(b);
      return (
        this.colorHelpersService.colorDifference(inputRgb, colorA) -
        this.colorHelpersService.colorDifference(inputRgb, colorB)
      );
    });
    palette.push(sortedColors[sortedColors.length - 1]);
    palette.push(sortedColors[sortedColors.length - 2]);
    let thirdColor = this.colorFormatService.hexToRgb(
      sortedColors[sortedColors.length - 3],
    );
    let thirdColorHex = this.colorFormatService.rgbToHex(thirdColor);

    if (palette.includes(thirdColorHex)) {
      thirdColor = {
        ...this.colorHelpersService.adjustLightness(thirdColor, 0.2),
        string: ``,
      };
      thirdColorHex = this.colorFormatService.rgbToHex(thirdColor);
    }

    palette.push(thirdColorHex);

    return palette;
  }
}
