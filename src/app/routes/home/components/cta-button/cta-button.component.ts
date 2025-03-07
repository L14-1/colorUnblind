import { Component, HostBinding, input, signal } from '@angular/core';
import { TablerIconComponent, provideTablerIcons } from 'angular-tabler-icons';
import { IconEye, IconEyeClosed } from 'angular-tabler-icons/icons';

@Component({
  selector: '[CtaButton]',
  imports: [TablerIconComponent],
  templateUrl: './cta-button.component.html',
  styleUrl: './cta-button.component.scss',
  providers: [provideTablerIcons({ IconEyeClosed, IconEye })],
})
export class CtaButtonComponent {
  public readonly isViewing = input(false);
  public iconPos = signal('transform(0, 0)');

  @HostBinding('style.border')
  get border() {
    return this.isViewing()
      ? 'var(--background-color) 0.125rem solid'
      : 'var(--text-color) 0.125rem solid';
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      if (this.isViewing()) {
        const { x, y } = this.getRandomPosition();
        this.iconPos.set(`translate(${x}px, ${y}px)`);
      }
    }, 700);
  }

  private getRandomPosition() {
    const x = Math.floor(Math.random() * 81) - 40;
    const y = Math.floor(Math.random() * 41) - 20;
    return { x, y };
  }
}
