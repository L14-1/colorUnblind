import { Component, input } from '@angular/core';
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
}
