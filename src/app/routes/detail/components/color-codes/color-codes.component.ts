import { Component, input } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { ClipboardCopyDirective } from '../../../../shared/directives/clipboard-copy.directive';
import { ButtonModule } from 'primeng/button';
import { IconCopy } from 'angular-tabler-icons/icons';

@Component({
  selector: 'app-color-codes',
  imports: [ButtonModule, TablerIconComponent, ClipboardCopyDirective],
  providers: [provideTablerIcons({ IconCopy })],
  templateUrl: './color-codes.component.html',
  styleUrl: './color-codes.component.scss',
})
export class ColorCodesComponent {
  public readonly hex = input.required<string>();
  public readonly rgb = input.required<string>();
  public readonly hsl = input.required<string>();
}
