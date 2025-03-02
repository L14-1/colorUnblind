import {
  Directive,
  ElementRef,
  inject,
  input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { ColorFormatService } from '../services/color-format.service';
import { ColorHelpersService } from '../services/color-helpers.service';

@Directive({
  selector: '[appContrastedText]',
})
export class ContrastedTextDirective implements OnChanges {
  public readonly backgroundColor = input.required<string>({
    alias: 'appContrastedText',
  });
  private readonly colorHelpersService = inject(ColorHelpersService);
  private readonly colorFormatService = inject(ColorFormatService);
  private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  ngOnChanges(): void {
    if (!this.backgroundColor() || !this.el) return;
    this.renderer.setStyle(
      this.el.nativeElement,
      'color',
      this.colorHelpersService.findMaxContrastColor(
        ['#ffffff', '#000000'],
        this.colorHelpersService.getRelativeLuminance(
          this.colorFormatService.hexToRgb(this.backgroundColor()),
        ),
      ),
    );
  }
}
